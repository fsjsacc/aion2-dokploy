#!/bin/sh
set -e

D1_DIR="/app/dist/server/.wrangler/state/v3/d1/miniflare-D1DatabaseObject"
INIT_D1="/app/init-data/wrangler-state/v3/d1/miniflare-D1DatabaseObject"

# Auto-init D1 database if volume is empty (first boot)
if [ -d "$INIT_D1" ] && { [ ! -f "$D1_DIR/faaf2b0445ab934c3aac48ddf0cdfade8f9bac050be98993748742cdd2cb05fb.sqlite" ] || [ ! -s "$D1_DIR/faaf2b0445ab934c3aac48ddf0cdfade8f9bac050be98993748742cdd2cb05fb.sqlite" ]; }; then
  echo "[entrypoint] Initializing D1 database from bundled data..."
  mkdir -p "$D1_DIR"
  for f in "$INIT_D1"/*.sqlite*; do
    case "$(basename "$f")" in *.broken*) continue ;; esac
    cp "$f" "$D1_DIR/"
  done
  echo "[entrypoint] D1 initialized ($(du -sh "$D1_DIR" | cut -f1))"
fi

# Auto-init R2 cache
R2_DIR="/app/dist/server/.wrangler/state/v3/r2/miniflare-R2BucketObject"
INIT_R2="/app/init-data/wrangler-state/v3/r2/miniflare-R2BucketObject"
if [ -d "$INIT_R2" ] && [ ! -f "$R2_DIR/metadata.sqlite" ]; then
  echo "[entrypoint] Initializing R2 cache..."
  mkdir -p "$R2_DIR"
  cp -r "$INIT_R2"/* "$R2_DIR/"
fi

# Auto-init Cache
CACHE_DIR="/app/dist/server/.wrangler/state/v3/cache/miniflare-CacheObject"
INIT_CACHE="/app/init-data/wrangler-state/v3/cache/miniflare-CacheObject"
if [ -d "$INIT_CACHE" ] && [ ! -f "$CACHE_DIR/metadata.sqlite" ]; then
  echo "[entrypoint] Initializing cache..."
  mkdir -p "$CACHE_DIR"
  cp -r "$INIT_CACHE"/* "$CACHE_DIR/"
fi

# Auto-init game data
DATA_DIR="/app/data"
INIT_DATA="/app/init-data/app-data"
if [ -d "$INIT_DATA" ] && [ ! -f "$DATA_DIR/crafting/.initialized" ]; then
  echo "[entrypoint] Initializing game data..."
  cp -r "$INIT_DATA"/* "$DATA_DIR/" 2>/dev/null || true
  touch "$DATA_DIR/.initialized"
fi

# Generate .dev.vars for wrangler (Worker secrets not in process.env)
DEV_VARS="/app/dist/server/.dev.vars"
if [ -n "$ADMIN_AUTH_SECRET" ] || [ -n "$ADMIN_PASSWORD_HASH" ]; then
  echo "[entrypoint] Generating .dev.vars for Worker secrets..."
  : > "$DEV_VARS"
  for var in ADMIN_AUTH_SECRET ADMIN_PASSWORD_HASH ANALYTICS_PSEUDONYM_KEY ANALYTICS_IP_ENCRYPTION_KEY SITE_URL NEXT_PUBLIC_SITE_URL X_LOCAL_EXPLORER WRANGLER_WRITE_LOGS ADMIN_API_KEY KEEP_LOCAL_MAP_ASSETS; do
    eval "val=\$$var"
    if [ -n "$val" ]; then
      echo "${var}=${val}" >> "$DEV_VARS"
    fi
  done
  echo "[entrypoint] .dev.vars created ($(wc -l < "$DEV_VARS") vars)"
fi

# Strip legacy_env from wrangler.json (wrangler 4.x rejects it, vinext still emits it)
# Also fix assets.directory to absolute path (wrangler dev resolves it from WORKDIR /app,
# not from wrangler.json location /app/dist/server/ — so "../client" becomes "/client" → 404)
WRANGLER_JSON="/app/dist/server/wrangler.json"
if [ -f "$WRANGLER_JSON" ]; then
  cat > /tmp/fix-wrangler.js << 'FIXEOF'
const fs = require("fs");
const f = "/app/dist/server/wrangler.json";
const j = JSON.parse(fs.readFileSync(f, "utf8"));
if ("legacy_env" in j) {
  delete j.legacy_env;
  console.log("[entrypoint] Removed legacy_env from wrangler.json");
}
if (j.assets && j.assets.directory && j.assets.directory !== "/app/dist/client") {
  j.assets.directory = "/app/dist/client";
  console.log("[entrypoint] Fixed assets.directory to /app/dist/client (was " + JSON.stringify(j.assets.directory) + ")");
}
fs.writeFileSync(f, JSON.stringify(j, null, 2));
FIXEOF
  node /tmp/fix-wrangler.js
  rm -f /tmp/fix-wrangler.js
fi

# ⚠️ 本块与 kina-test 已实跑验证的那版逐字节相同（test 仓库 f638d3b），也和 kina-dev 在用的一致。
# 上生产前要知道的：entrypoint.sh 是**共享构建文件** ⇒ 带上它的这次发布会连带重建 live 槽
#   （deploy-dokploy-safe.mjs 默认拒绝，需 --allow-shared-change 或排进切换窗口）。
#   两槽 healthcheck 均已有 start_period: 300s，与下面 15×20s 宽限对齐，冷启动不会被自己杀掉。
# 自愈看门狗（2026-09-22 加）。背景：workerd 把自身 cgroup 撑满被内核杀掉后，PID 1 的 wrangler
# 既不退出也不重启子进程 ⇒ 容器停在 "running 但零服务" 的僵尸态（09-22 在 kina-test 实测：
# 连续 136 个请求超时、8.5 分钟无任何日志、不自愈；edge 钉死单服务 ⇒ 另一槽也接不了）。
# 处理：冷启动宽限后连续探测失败到阈值就结束 PID 1，交给 compose 的 restart: unless-stopped 复活。
# 宽限 300s 与 healthcheck 的 start_period 对齐（冷启动要跑 assertContentRegistryValid + workerd 初始化）。
(
  WD_PROBE='fetch("http://localhost:3001/en/", { signal: AbortSignal.timeout(10000) }).then((r) => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))'
  g=0
  while [ "$g" -lt 15 ]; do sleep 20; g=$((g + 1)); done
  fails=0
  while :; do
    if node -e "$WD_PROBE" 2>/dev/null; then
      fails=0
    else
      fails=$((fails + 1))
      echo "[watchdog] /en/ 探测失败 ${fails}/5"
      if [ "$fails" -ge 5 ]; then
        echo "[watchdog] 连续 5 次失败 ⇒ 结束 PID 1，由 Docker 重启容器（僵尸态不可自愈）"
        kill -TERM 1 2>/dev/null
        sleep 10
        kill -KILL 1 2>/dev/null
        exit 0
      fi
    fi
    sleep 20
  done
) &

echo "[entrypoint] Starting application..."
exec "$@"

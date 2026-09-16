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

echo "[entrypoint] Starting application..."
exec "$@"

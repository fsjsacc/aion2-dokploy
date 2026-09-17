FROM node:22-bookworm-slim

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund 2>&1 | tail -5

# Copy pre-built dist/ (synced from source repo before deploy)
COPY dist/ ./dist/

# Copy map assets (tiles, sprites) — these are pruned from dist/client/ by postbuild
# but needed for the ASSETS binding to serve them in wrangler dev --local mode
COPY map-assets/ ./dist/client/map-assets/

# Copy init-data (will be copied to volume on first boot)
COPY init-data/ /app/init-data/

# Copy entrypoint script
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Create directories
RUN mkdir -p dist/server/.wrangler/state/v3 dist/server/.wrangler/tmp data

# Fix wrangler.json assets.directory at build time (2026-09-17 18:30 rebuild)
# wrangler dev resolves assets.directory from project root (WORKDIR), not from wrangler.json location
RUN node -e "\
  const fs = require('fs'); \
  const f = '/app/dist/server/wrangler.json'; \
  if (fs.existsSync(f)) { \
    const j = JSON.parse(fs.readFileSync(f, 'utf8')); \
    if ('legacy_env' in j) delete j.legacy_env; \
    if (j.assets && j.assets.directory) j.assets.directory = '/app/dist/client'; \
    fs.writeFileSync(f, JSON.stringify(j, null, 2)); \
    console.log('Fixed wrangler.json: assets.directory =', j.assets?.directory); \
  } else { \
    console.log('wrangler.json not found at', f); \
  }"

EXPOSE 3001

HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
  CMD node -e "fetch('http://localhost:3001/en/').then(r=>{if(!r.ok)throw 1})" || exit 1

ENTRYPOINT ["/app/entrypoint.sh"]
CMD ["npx", "wrangler", "dev", "dist/server/index.js", "--local", "--port", "3001", "--ip", "0.0.0.0"]

FROM node:22-bookworm-slim

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund 2>&1 | tail -5

# Copy pre-built dist/
COPY dist/ ./dist/

# Copy init-data (will be copied to volume on first boot)
COPY init-data/ /app/init-data/

# Copy entrypoint script
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Create directories
RUN mkdir -p dist/server/.wrangler/state/v3 dist/server/.wrangler/tmp data

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
  CMD node -e "fetch('http://localhost:3000/health').then(r=>{if(!r.ok)throw 1})" || exit 1

ENTRYPOINT ["/app/entrypoint.sh"]
CMD ["npx", "wrangler", "dev", "dist/server/index.js", "--local", "--port", "3000", "--ip", "0.0.0.0"]

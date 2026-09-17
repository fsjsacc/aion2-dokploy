FROM node:22-bookworm-slim

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund 2>&1 | tail -5

# Copy pre-built dist/
# Download dist from GitHub Release (avoids git clone timeout on build server)
RUN curl -sL -o /tmp/dist.zip "https://github.com/fsjsacc/aion2-dokploy/releases/download/v1.0.0/dist.zip" && \
    apt-get update -qq && apt-get install -y -qq unzip > /dev/null 2>&1 && \
    unzip -q /tmp/dist.zip -d ./dist/ && \
    rm /tmp/dist.zip && \
    apt-get purge -y -qq unzip > /dev/null 2>&1 && apt-get autoremove -y -qq > /dev/null 2>&1

# Copy init-data (will be copied to volume on first boot)
COPY init-data/ /app/init-data/

# Copy entrypoint script
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Create directories
RUN mkdir -p dist/server/.wrangler/state/v3 dist/server/.wrangler/tmp data

EXPOSE 3001

HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
  CMD node -e "fetch('http://localhost:3001/health').then(r=>{if(!r.ok)throw 1})" || exit 1

ENTRYPOINT ["/app/entrypoint.sh"]
CMD ["npx", "wrangler", "dev", "dist/server/index.js", "--local", "--port", "3001", "--ip", "0.0.0.0"]

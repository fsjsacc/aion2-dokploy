FROM nginx:alpine

# Blue-green rehearsal: the edge is the single Traefik router holder and the only
# thing recreated when we flip slots. Upstream is rendered from env at container start.
# NGINX_ENVSUBST_FILTER (set in compose) restricts substitution to ${UPSTREAM_*}
# so nginx's own $host / $remote_addr / $http_upgrade / $scheme stay intact.
RUN rm -f /etc/nginx/conf.d/default.conf
COPY templates/edge.conf.template /etc/nginx/templates/edge.conf.template

EXPOSE 80

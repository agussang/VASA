FROM nginx:stable

COPY docker/nginx/nginx.conf /etc/nginx/nginx.conf
COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY dist /usr/share/nginx/html
COPY tls /tmp
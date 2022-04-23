FROM nginx:1.21.4-alpine

ADD "./*.conf" "/etc/nginx/"
COPY "./conf.d" "/etc/nginx/conf.d"

ADD "./ssl" "/etc/ssl/"

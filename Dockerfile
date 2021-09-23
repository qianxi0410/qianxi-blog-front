FROM nginx

EXPOSE 80 443

COPY dist/ /usr/share/nginx/html

COPY nginx/default.conf /etc/nginx/nginx.conf

COPY ssl/1_qianx1.xyz_bundle.crt /etc/nginx/1_qianx1.xyz_bundle.crt

COPY ssl/2_qianx1.xyz.key /etc/nginx/2_qianx1.xyz.key
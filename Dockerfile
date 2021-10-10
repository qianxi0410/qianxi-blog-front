FROM nginx

EXPOSE 80 443

COPY dist/ /usr/share/nginx/html

COPY nginx/default.conf /etc/nginx/nginx.conf

COPY ssl/1_blog.qianx1.xyz_bundle.crt /etc/nginx/1_blog.qianx1.xyz_bundle.crt

COPY ssl/2_blog.qianx1.xyz.key /etc/nginx/2_blog.qianx1.xyz.key

COPY ssl/1_api.qianx1.xyz_bundle.crt /etc/nginx/1_api.qianx1.xyz_bundle.crt

COPY ssl/2_api.qianx1.xyz.key /etc/nginx/2_api.qianx1.xyz.key
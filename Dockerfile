FROM node:alpine AS build
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run-script export

FROM nginx:alpine
COPY --from=build /usr/src/app/__sapper__/export /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]

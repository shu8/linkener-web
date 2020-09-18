FROM node:alpine AS build
WORKDIR /usr/src/app
COPY . .
RUN npm install

# Support for running the web app on a subpath rather than root domain
# If we want to run on a subpath:
## - start_url needs to be updated in the PWA manifest.json
## - scope needs to be updated in the PWS manifest.json
## - service worker registration need to define the scope to '/PATH/' (see https://stackoverflow.com/a/48068714)
## - may also need to add a Service-Worker-Allowed HTTP header too
ARG BASE_PATH=/
RUN if [ "$BASE_PATH" = "/" ]; then \
        npm run export; \
    else \
        sed -i "s|\"start_url\": \"/\"|\"start_url\": \"$BASE_PATH/\"|g" static/manifest.json && \
        sed -i "s|\"scope\": \"/\"|\"scope\": \"$BASE_PATH/\"|g" static/manifest.json && \
        BASE_PATH=${BASE_PATH} npm run export -- --basepath ${BASE_PATH} && \
        find __sapper__/export -type f -name "*.html" -exec sed -i "s|navigator.serviceWorker.register('\/\(.*\)service-worker.js')|navigator.serviceWorker.register(\'/\1service-worker.js',{scope:'/\1'})|g" {} \;; \
    fi

FROM nginx:alpine
COPY --from=build /usr/src/app/__sapper__/export /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]

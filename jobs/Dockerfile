FROM node:18.17.0-slim as builder

ARG ROOT_APP_DIR=/var/www/html
WORKDIR $ROOT_APP_DIR

COPY package.json \ 
    yarn.lock* \
    avg_temperature.js \
    .env-* ./

RUN yarn install

FROM node:18.17.0-alpine as main

ARG ROOT_APP_DIR=/var/www/html

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

# Set timezone
RUN apk add tzdata
RUN cp /usr/share/zoneinfo/Asia/Manila /etc/localtime
RUN echo "Asia/Manila" > /etc/timezone

WORKDIR $ROOT_APP_DIR

# Add `/var/www/html/node_modules/.bin` to $PATH
ENV PATH=$PATH:${ROOT_APP_DIR}/node_modules/.bin

COPY --from=builder $ROOT_APP_DIR ./

FROM main as job_dev

CMD ["yarn","dev"]

FROM main as job_staging

CMD [ "yarn", "start:staging" ]

FROM main as job_prod

CMD ["yarn","start:prod"]
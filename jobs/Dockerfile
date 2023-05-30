FROM node:18-slim as builder

ARG ROOT_APP_DIR=/var/www/html
WORKDIR $ROOT_APP_DIR

# Add `/app/node_modules/.bin` to $PATH
ENV PATH=$ROOT_APP_DIR/node_modules/.bin:$PATH

COPY --chown=node:node . $ROOT_APP_DIR

RUN npm install

FROM node:18-alpine as main

# Set timezone
RUN apk add tzdata
RUN cp /usr/share/zoneinfo/Asia/Manila /etc/localtime
RUN echo "Asia/Manila" > /etc/timezone

ARG ROOT_APP_DIR=/var/www/html

WORKDIR $ROOT_APP_DIR

COPY --from=builder $ROOT_APP_DIR ./

FROM main as job_dev

CMD ["yarn","dev"]

FROM main as job_prod

CMD ["yarn","start:prod"]
FROM node:18-slim as builder

ARG ROOT_APP_DIR=/var/www/html
WORKDIR $ROOT_APP_DIR

COPY src ./src

COPY public ./public

COPY .env-* \
    package.json \
    yarn.lock* \
    global.d.ts \
    pm2.config.js \
    next.config.js \
    tsconfig.json ./

RUN yarn install

FROM node:18-alpine as main

ARG ROOT_APP_DIR=/var/www/html

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

# Set timezone
RUN apk add tzdata
RUN cp /usr/share/zoneinfo/Asia/Manila /etc/localtime
RUN echo "Asia/Manila" > /etc/timezone

WORKDIR $ROOT_APP_DIR

# Add `/app/node_modules/.bin` to $PATH
ENV PATH=$PATH:${ROOT_APP_DIR}/node_modules/.bin
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=builder $ROOT_APP_DIR ./

FROM main as app_dev

CMD ["yarn","dev"]

FROM main as app_staging

CMD ["yarn", "start:staging"]

FROM main as app_prod

# Possible workaround to fix. nextjs error: The server running out of memory
# TODO: verify if this workaround is working.
ENV NODE_OPTIONS="--max-old-space-size=8192"

RUN mkdir -p .next
RUN chown node:node -R .next && \
    chmod 777 -R .next

CMD ["yarn","start:prod"]
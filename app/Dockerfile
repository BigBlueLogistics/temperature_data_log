FROM node:18-slim as builder

ARG ROOT_APP_DIR=/var/www/html
WORKDIR $ROOT_APP_DIR

# Add `/app/node_modules/.bin` to $PATH
ENV PATH=$ROOT_APP_DIR/node_modules/.bin:$PATH
ENV NEXT_TELEMETRY_DISABLED=1

COPY --chown=node:node . $ROOT_APP_DIR

RUN npm install

FROM node:18-alpine as main

# Set timezone
RUN apk add tzdata
RUN cp /usr/share/zoneinfo/Asia/Manila /etc/localtime
RUN echo "Asia/Manila" > /etc/timezone

ENV NEXT_TELEMETRY_DISABLED=1
ARG ROOT_APP_DIR=/var/www/html

WORKDIR $ROOT_APP_DIR

COPY --from=builder $ROOT_APP_DIR ./

FROM main as app_dev

ENV PORT=3100
EXPOSE 3100

CMD ["yarn","dev"]


FROM main as app_prod

ENV PORT=4100
EXPOSE 4100

RUN mkdir -p .next
RUN chown node:node -R .next && \
    chmod 777 -R .next

CMD ["yarn","start:prod"]
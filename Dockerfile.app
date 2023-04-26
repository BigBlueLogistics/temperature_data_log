FROM node:18-slim as builder

ARG ROOT_APP_DIR=/var/www/html
WORKDIR $ROOT_APP_DIR

# Add `/app/node_modules/.bin` to $PATH
ENV PATH=$ROOT_APP_DIR/node_modules/.bin:$PATH
ENV NEXT_TELEMETRY_DISABLED=1

COPY --chown=node:node . $ROOT_APP_DIR

RUN npm install

FROM node:18-alpine as main

ENV NEXT_TELEMETRY_DISABLED=1
ARG ROOT_APP_DIR=/var/www/html

WORKDIR $ROOT_APP_DIR

COPY --from=builder $ROOT_APP_DIR ./

FROM main as app_dev

ENV PORT=3100
EXPOSE 3100

CMD ["yarn","dev"]

# TODO: execute only for production
# current user should add to sudo groups and 
# update the ownership of /${build_dir} folder to current user

FROM main as app_prod
ARG build_dir

RUN mkdir -p ${build_dir}
RUN chown node:node -R ${build_dir} && \
    chmod 755 -R ${build_dir}

CMD ["yarn","build"]
# copied from https://stash-gpn.nexign.com/projects/PROJTMPL/repos/react-template
#
#########################
### build environment ###
#########################
ARG APP_DIR=/usr/src/app
ARG BACKEND_API=http://localhost:5005

# стабильный репозиторий для установки внешних зависимостей
ARG REPOSITORY_MIRROR=http://mirror.yandex.ru/mirrors
# репозиторий для NPM
# ARG NPM_CONFIG_REGISTRY=https://artifactory-gpn.nexign.com/artifactory/api/npm/npm/
ARG SASS_BINARY_SITE=http://repo.nexign.com/packages/npm/node-sass

# base image
FROM docker-gpn.nexign.com/shared/ubi7/ubi as node
ARG APP_DIR
ARG REPOSITORY_MIRROR
ARG NPM_CONFIG_REGISTRY
ARG NPM_LOGIN
ARG NPM_PASSWORD
ARG SASS_BINARY_SITE
ARG REPOSITORY_TOKEN

#instal nodejs and npm
RUN YUM_FORCE_TLS11=1 yum update -y && yum -y install rh-nodejs12-npm

SHELL [ "/usr/bin/scl", "enable", "rh-nodejs12" ]

RUN npm -g install yarn

# Start e2e: Раздел для настройки e2e тестов.
# В случае внедрения тестирования компонентов, например, на StoryBook, необходимо будет раскоментировать данный раздел
# install chrome for tests
# RUN  echo @edge ${REPOSITORY_MIRROR}/alpine/edge/community >> /etc/apk/repositories && \
#      echo @edge ${REPOSITORY_MIRROR}/alpine/edge/main >> /etc/apk/repositories && \
#      apk update && apk upgrade
#      apk add --no-cache \
#      chromium@edge \
#      nss@edge \
#      freetype@edge \
#      harfbuzz@edge

#ARG CHROME_BIN=/usr/bin/chromium-browser
#ARG CHROME_PATH=/usr/lib/chromium/

# End e2e: Окончание раздела e2e

# set working directory
RUN mkdir -p ${APP_DIR}
WORKDIR ${APP_DIR}

# add `${APP_DIR}/node_modules/.bin` to $PATH
# ENV PATH ${APP_DIR}/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package*.json ${APP_DIR}/
COPY yarn.lock ${APP_DIR}/

# Если необходима аутентифиакация, например есть приватные пакеты во внутреннем репозитории,
# то необходимо испрльзовать блок аутентификации
# при этом registry используется из NPM_CONFIG_REGISTRY
RUN echo "@gpn-prototypes:registry=https://npm.pkg.github.com"  >> ${HOME}/.npmrc && \
	echo "_auth=${REPOSITORY_TOKEN}" >> ${HOME}/.npmrc && \
	echo "always-auth=true" >> ${HOME}/.npmrc

# RUN	sleep 1 && \
# 	npm i && \
# 	rm -f ${HOME}/.npmrc

# add app
COPY . ${APP_DIR}

RUN yarn install && yarn build

RUN cat ${HOME}/.npmrc
# RUN rm -f ${HOME}/.npmrc


# run tests
#RUN npm run lint:ts && \
#    npm run lint:scss

# generate build
#RUN npm run build

##################
### production ###
##################

# base image
FROM docker-gpn.nexign.com/shared/rhscl/nginx-116-rhel7:latest
USER 2001
ARG APP_DIR
ARG BACKEND_API

ENV LISTEN_PORT=8080 \
	BACKEND_API=${BACKEND_API}

# copy artifact build from the 'build environment'
COPY --chown=2001:0 --from=node ${APP_DIR}/build /opt/app-root/www/
COPY --chown=2001:0 --from=node ${APP_DIR}/nginx/nginx.conf /etc/opt/rh/rh-nginx116/nginx/nginx.conf
COPY --chown=2001:0 --from=node ${APP_DIR}/nginx/app-nginx.tpl.conf /opt/app-root/etc/app-nginx.tpl.conf

# expose port
EXPOSE ${LISTEN_PORT}

# run nginx
CMD ["/bin/sh" , "-c" , "envsubst '$LISTEN_PORT' < \
	/opt/app-root/etc/app-nginx.tpl.conf > \
	/opt/app-root/etc/nginx.d/app.conf && \
	exec nginx -g 'daemon off;'"]


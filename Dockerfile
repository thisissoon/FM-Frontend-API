#
# FM-Frontend-API Docker File
# Builds a docker image to run the FM frontend services
#

FROM mhart/alpine-node:latest

RUN apk update && apk add \
    make gcc g++ python git && \
    rm -rf /var/cache/apk/*

# Install global npm dependencies
RUN npm install -g \
    forever \
    grunt-cli \
    bower

# Ensure a SOON user exists
RUN adduser SOON -D

# Install API dependencies
WORKDIR /app
ADD package.json /app/package.json
RUN npm install --production

# Bundle API source
ADD . /app

# Install FE
WORKDIR /app/assets
RUN npm install && \
    bower install --allow-root && \
    grunt build --env frontend-api

# Copy FE build to public directory
RUN mkdir -p /app/.tmp/public && \
    cp -r dist/* /app/.tmp/public/ && \
    rm -rf `find . -type f | grep -v '.*\/dist\/.*'`

WORKDIR /app

EXPOSE  1337
CMD ["npm", "start"]

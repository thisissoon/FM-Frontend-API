#
# FM-Frontend-API Docker File
# Builds a docker image to run the FM Frontend Backend service
#

FROM mhart/alpine-node:latest

RUN apk update && apk add \
    make g++ python git && \
    rm -rf /var/cache/apk/*

# Install global npm dependencies
RUN npm install -g \
    forever \
    grunt-cli

# Ensure a SOON user exists
RUN adduser SOON -D

# Install API dependencies
WORKDIR /app
ADD package.json /app/package.json
RUN npm install --production

# Bundle API source
ADD . /app

EXPOSE  1337
CMD ["npm", "start"]

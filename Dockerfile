#
# FM-Frontend-API Docker File
# Builds a docker image to run the FM frontend services
#

FROM node:slim

RUN apt-get update -y && apt-get install --no-install-recommends -y -q curl python build-essential git ca-certificates

# Install global npm dependencies
RUN npm install -g \
    sails \
    forever \
    grunt-cli \
    bower

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
RUN mkdir /app/.tmp/public && \
    cp -r dist/* /app/.tmp/public/ && \
    rm -rf `find . -type f | grep -v '.*\/dist\/.*'`

WORKDIR /app

EXPOSE  1337
CMD ["npm", "start"]

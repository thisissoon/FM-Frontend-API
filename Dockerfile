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
RUN npm install

# Bundle API source
ADD . /app

# Install FE packages
WORKDIR /app/assets
RUN npm install && \
    bower install --allow-root && \
    grunt build --env frontend-api

# Copy FE source to serve directory
RUN mv dist /app/.tmp/public && \
    rm -rf /app/assets

WORKDIR /app

EXPOSE  1337
CMD ["npm", "start"]

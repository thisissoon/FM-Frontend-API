# FM Frontend API

The FM Frontend API provides API and Socket services for the FM Frontend. It uses the [Sails](http://sailsjs.org) framework.

## Developing

Ensure you have the following tools before you start developing this application:

* [NodeJS](http://nodejs.org/)
* [Grunt](https://www.npmjs.com/package/grunt) `sudo npm install grunt -g`
* [Git Flow](https://github.com/nvie/gitflow)
* [Docker](https://docs.docker.com/installation) _(optional)_

### Environments
A few pre-configured environments are provided to ease development.

####`production`
Defaults to use the public address for the production FM API, it can also be configured through [ENV variables](#environment-variables).

`sails lift --prod` or `NODE_ENV=production sails lift`

####`development`
Isolated envrionment using a local mock database (sails-disk) for serving mock data to the FE.

`sails lift`

####`localdocker`
Pre-configured to access services running on `localdocker` eg. http://localdocker:5000 (API)

`NODE_ENV=localdocker sails lift`

#### Environment variables

- `FM_API_URI` FM API server address (api.thisissoon.fm)
- `REDIS_URI` Redis pubsub server address (redis://redis:6379)
- `REDIS_CHANNEL` Redis channel to listen for events (fm:events)

### Docker

The FM Frontend API is designed to be run under docker. This section will describe how to get the application up and running under docker.

Once you have docker running the first thing to do is pull the docker image.

    $ docker pull registry.soon.build/fm/febe

#### Building the Docker Image

To build the image locally run:

    $ docker build -t registry.soon.build/fm/febe

To build a version with the FE included run:

    $ docker build -f Dockerfile.fe -t registry.soon.build/fm/febe:with-fe

#### Running the Application

    $ docker run --rm -it registry.soon.build/fm/febe

#### Running in Development

To run the application in development with docker, we're using [Docker Compose](https://docs.docker.com/compose/).

##### Docker Compose (OSX)
Docker Compose defines all the services that make up the app in docker-compose.yml and runs them together in an isolated environment. Simply run:

    $ docker-compose up

To attach your local API code for development, un-comment the relevant application volumes in docker-compose.yml.

Check it out at [http://localdocker:1337](http://localdocker:1337)


### Without Docker
You can of course run the application without docker, just following the guide below.

#### Prerequisites

There are some prerequisites that need to be installed before you can install the project:

 - SailsJS v0.11 `sudo npm install sails -g`
 - ForeverJS `sudo npm install forever -g`

#### Install the Project

Clone this repository, cd into the project directory and run:

    $ npm install

#### Running the Application

    $ npm start

#### Running in Development
To run the server with auto restarts on changes to source files use forever with `-w`:

    $ forever -w start app.js

Check it out at [http://localhost:1337](http://localhost:1337)

## Testing

Our test suites use the [Mocha](http://mochajs.org/) framework with the following tools:
- [Chai](http://chaijs.com/) assertion library
- [Sinon.JS](http://sinonjs.org/) for spies, stubs and mocks
- [SuperTest](https://www.npmjs.com/package/supertest) for HTTP assertions

### Assertions with Chai
Chai has several interfaces, we use the chain-capable BDD style with expect syntax. For more information see the [Chai API documentation](http://chaijs.com/api/bdd/). We're also making use of the [Sinon-Chai plugin](http://chaijs.com/plugins/sinon-chai) to provide custom assertions for Sinon.JS.

### Test Commands

We use grunt to orchestrate the testing tasks. The test suite can be run using either of the following commands:

    $ npm test
    $ grunt test

To run the test suite with auto-reruns on code changes, run:

    $ grunt test:dev

## Documentation

TODO


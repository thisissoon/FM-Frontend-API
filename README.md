# FM Frontend API

The FM Frontend API provides services for the FM front-end and can also serve the front-end application. It uses the [Sails](http://sailsjs.org) framework.

## Developing

### Environments
A few pre-configured environments are provided to ease development.

####`production`
Defaults to the public address for the production API, can be configured through [ENV variables](#environment-variables).

`sails lift --prod`

####`development`
Isolated envrionment using local mock database for serving mock data to the FE.

`sails lift`

####`localdocker`
Configured to access services running on `localdocker` eg. http://localdocker:5000 (API)

`NODE_ENV=localdocker sails lift`

#### Environment variables

- `FM_API_URI` FM API server address (api.thisissoon.fm)
- `REDIS_URI` Redis pubsub server address (redis://redis:6379)
- `REDIS_CHANNEL` Redis channel to listen for events (fm:events)


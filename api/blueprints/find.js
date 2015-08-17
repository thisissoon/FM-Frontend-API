/**
 * Module dependencies
 */
var localFind = require('sails/lib/hooks/blueprints/actions/find');

/**
 * Find Records on external REST service
 *
 *  get   /:modelIdentity
 *   *    /:modelIdentity/find
 *
 * An API call to find and return model instances from an external REST service.
 * In development, the local sails model will be queried instead.
 *
 */

module.exports = function findRecords (req, res) {

  if (sails.config.environment === 'development') {

    // Use mocked API through sails original find blueprint
    return localFind(req, res);

  } else {

    var Service = actionUtil.parseService(req);

    // Query external REST service
    Service.get(req.url.replace(/\/api\//, "/"), {
      headers: req.headers
    })
    .on('complete', function (data, response) {
      res.status(response.headers.status);
      res.send(data);
    });

  }

};

/**
 * Module dependencies
 */
var localFind = require('sails/lib/hooks/blueprints/actions/find');

/**
 * Find Records no FM API
 *
 *  get   /:modelIdentity
 *   *    /:modelIdentity/find
 *
 * An API call to find and return model instances from the FM API.
 * In development, the local sails model will be queried instead.
 *
 */

module.exports = function findRecords (req, res) {

  if (sails.config.environment === 'development') {

    // Use mocked API through sails original find blueprint
    return localFind(req, res);

  } else {

    // Query FM API
    fmAPI.get(req.url, {
      headers: req.headers
    })
    .on('complete', function (data, response) {
      res.status(response.headers.status);
      res.send(data);
    });

  }

};

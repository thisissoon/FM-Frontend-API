/**
 * Module dependencies
 */
var actionUtil = require('sails/lib/hooks/blueprints/actionUtil'),
    localFind = require('sails/lib/hooks/blueprints/actions/find');

/**
 * Find Records from FM API
 *
 *  get   /:modelIdentity
 *   *    /:modelIdentity/find
 *
 * An API call to find and return model instances from the FM API.
 * If in development, the local sails models will be queried instead
 *
 */

module.exports = function findRecords (req, res) {

  if (sails.config.environment === 'production') {

    // Query FM API
    fmAPI.get(req.url).on('complete', function (response) {
      res.ok(response);
    });

  } else {

    // Use mocked API through sails original find blueprint
    return localFind(req, res);

  }

};

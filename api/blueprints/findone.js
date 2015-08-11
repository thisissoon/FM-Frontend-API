/**
 * Module dependencies
 */
var localFindOne = require('sails/lib/hooks/blueprints/actions/findOne');

/**
 * Find One Record
 *
 * get /:modelIdentity/:id
 *
 * An API call to find and return a single model instance from the FM API
 * using the specified id. In development, the local sails model will be queried instead.
 *
 * Required:
 * @param {Integer|String} id  - the unique id of the particular instance you'd like to look up *
 *
 * Optional:
 * @param {String} callback - default jsonp callback param (i.e. the name of the js function returned)
 */

module.exports = function findOneRecord (req, res) {

  if (sails.config.environment === 'development') {

    // Use mocked API through sails original findOne blueprint
    return localFindOne(req, res);

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

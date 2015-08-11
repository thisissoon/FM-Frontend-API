/**
 * Module dependencies
 */
var localCreate = require('sails/lib/hooks/blueprints/actions/create');

/**
 * Create Record on FM API
 *
 * post /:modelIdentity
 *
 * An API call to find and return a single model instance from the FM API
 * using the specified criteria. In development, a local sails model will be created instead.
 *
 * Optional:
 * @param {String} callback - default jsonp callback param (i.e. the name of the js function returned)
 * @param {*} * - other params will be used as `values` in the create
 */
module.exports = function createRecord (req, res) {

  if (sails.config.environment === 'development') {

    // Use mocked API through sails original create blueprint
    return localCreate(req, res);

  } else {

    // Create record on FM API
    fmAPI.post(req.url, {
      data: JSON.stringify(req.body),
      headers: req.headers
    })
    .on('complete', function (data, response) {
      res.status(response.headers.status);
      res.send(data);
    });

  }

};

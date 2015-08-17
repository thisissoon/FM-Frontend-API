/**
 * Module dependencies
 */
var localCreate = require('sails/lib/hooks/blueprints/actions/create');

/**
 * Create Record on external REST service
 *
 * post /:modelIdentity
 *
 * An API call to find and return a single model instance from an external REST service
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

    var Service = actionUtil.parseService(req);

    // Create record on external REST service
    Service.post(req.url.replace(/\/api\//, "/"), {
      data: JSON.stringify(req.body),
      headers: req.headers
    })
    .on('complete', function (data, response) {
      res.status(response.headers.status);
      res.send(data);
    });

  }

};

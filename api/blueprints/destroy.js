/**
 * Module dependencies
 */
var localDestroy = require('sails/lib/hooks/blueprints/actions/destroy');

/**
 * Destroy One Record on external REST service
 *
 * delete  /:modelIdentity/:id
 *    *    /:modelIdentity/destroy/:id
 *
 * Destroys the single model instance with the specified `id` from an external REST service.
 * In development, the local sails model will be destroyed instead.
 *
 * Required:
 * @param {Integer|String} id  - the unique id of the particular instance you'd like to delete
 */
module.exports = function destroyOneRecord (req, res) {

  if (sails.config.environment === 'development') {

    // Use mocked API through sails original destroy blueprint
    return localDestroy(req, res);

  } else {

    var Service = actionUtil.parseService(req);

    // Destroy record on external REST service
    Service.del(req.url.replace(/\/api\//, "/"))
      .on('complete', function (data, response) {
        res.status(response.headers.status);
        res.send(data);
      });

  }

};

/**
 * Module dependencies
 */
var localDestroy = require('sails/lib/hooks/blueprints/actions/destroy');

/**
 * Destroy One Record on FM API
 *
 * delete  /:modelIdentity/:id
 *    *    /:modelIdentity/destroy/:id
 *
 * Destroys the single model instance with the specified `id` from the FM API.
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

    // Destroy record on FM API
    fmAPI.del(req.url)
      .on('complete', function (data, response) {
        res.status(response.headers.status);
        res.send(data);
      });

  }

};

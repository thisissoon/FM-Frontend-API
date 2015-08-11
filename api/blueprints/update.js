/**
 * Module dependencies
 */

var localUpdate = require('sails/lib/hooks/blueprints/actions/update');

/**
 * Update One Record from FM API
 *
 * An API call to update a model instance with the specified `id`.
 * In development, the local sails model will be updated instead.
 *
 * @param {Integer|String} id  - the unique id of the particular record you'd like to update  (Note: this param should be specified even if primary key is not `id`!!)
 * @param *                    - values to set on the record
 *
 */
module.exports = function updateOneRecord (req, res) {

  if (sails.config.environment === 'development') {

    // Use mocked API through sails original update blueprint
    return localUpdate(req, res);

  } else {

    // Update record on FM API
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

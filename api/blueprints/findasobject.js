/**
 * Module dependencies
 */
var actionUtil = require('../services/actionUtil');

/**
 * Find One Record
 *
 * get /:modelIdentity
 *
 * An API call to find and return a single model instance from the data adapter
 * without a specified id.
 *
 * Optional:
 * @param {String} callback - default jsonp callback param (i.e. the name of the js function returned)
 */

module.exports = function findOneRecord (req, res) {

  var Model = actionUtil.parseModel(req);

  Model.find()
    .then(function (response) {
      // morph response
      res.ok(response[0]);
    })
    .catch(function (err) {
      res.negotiate(err);
    });

};

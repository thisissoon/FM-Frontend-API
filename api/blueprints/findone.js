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

  // var query = Model.find();
  // query = actionUtil.populateEach(query, req);
  // query.exec(function found(err, matchingRecord) {
  //   if (err) return res.serverError(err);
  //   if(!matchingRecord) return res.notFound('No record found with the specified `id`.');

  //   if (sails.hooks.pubsub && req.isSocket) {
  //     Model.subscribe(req, matchingRecord);
  //     actionUtil.subscribeDeep(req, matchingRecord);
  //   }

  //   res.ok({ foo: "bar" });
  // });

  Model.find()
    .then(function (response) {
      // morph response
      res.ok(response[0]);
    })
    .catch(function (err) {
      res.negotiate(err);
    });

};

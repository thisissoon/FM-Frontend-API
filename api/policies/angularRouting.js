/**
 * angularRouting
 *
 * @module      :: Policy
 * @description :: Simple policy to re route non api and assets calls to index.html
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(req, res, next) {

  var API_REGEX = /\/api\//,
      ASSET_REGEX = /\..*/,
      options = {
        root: __dirname + '../../../.tmp/public/'
      },
      fileName = 'index.html';

  // Fast check for api requests
  if (ASSET_REGEX.test(req.path)) return next();
  if (API_REGEX.test(req.path)) return next();

  res.sendfile(fileName, options, function (err) {
    if (err) {
      sails.log.error(err);
      res.status(err.status).end();
    }
    else {
      sails.log.info('Sent:', fileName);
    }
  });

};

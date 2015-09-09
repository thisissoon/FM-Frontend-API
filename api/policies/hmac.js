'use strict';
/**
 * Module dependencies
 */
var crypto = require('crypto');

/**
 * HMAC Verification
 *
 * @module      :: Policy
 * @description :: Policy to verify client HMAC signature
 *
 */
module.exports = function(req, res, next) {

  /**
   * Collection of trusted clients from config
   * @property {Object} clients
   */
  var clients = sails.config.clients;

  /**
   * @property {Object} errResponse
   */
  var errResponse = { _errors: {} };

  // Validate signature header has been provided
  if (!req.headers.signature) {
    errResponse._errors.signature = 'Invalid Signature';
    return res.badRequest(errResponse);
  }

  /**
   * Id of client parsed from signature header
   * @property {String} clientId
   */
  var clientId = req.headers.signature.split(':', 1)[0];

  /**
   * signature parsed from signature header
   * @property {String} signature
   */
  var clientSignature = req.headers.signature.split(':', 2)[1];

  /**
   * Trusted secret key of client
   * @property {String} key
   */
  var key = clients[clientId];

  if (!key) {
    errResponse._errors.signature = 'Invalid Signature';
    return res.badRequest(errResponse);
  }

  /**
   * Create signature from encoding request body with secret key, for comparison
   * @property {String} signature
   */
  var signature = crypto.createHmac('sha256', key).update(req.body.toString()).digest('base64');

  // Verify provided signature against computed
  if (clientSignature !== signature) {
    errResponse._errors.signature = 'Invalid Signature';
    return res.badRequest(errResponse);
  }

  return next();

};

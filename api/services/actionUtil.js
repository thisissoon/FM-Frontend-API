/**
 * Module dependencies
 * @external
 */
var _ = require('lodash'),
    _super = require('sails/lib/hooks/blueprints/actionUtil'),
    util = require('util');

/**
 * Extend sails actionUtil with custom methods
 * @module actionUtil
 * @exports
 */
module.exports = _.merge(_super, {

  /**
   * Parse service from request route options
   * @method parseService
   * @param {Object} req Express request
   */
  parseService: function parseService (req) {

    // Ensure a service can be deduced from the request options.
    var service = req.options.service;
    if (!service) throw new Error(util.format('No "service" specified in route options.'));

    var Service = req._sails.services[req.options.service];
    if (!Service) throw new Error(util.format('Invalid route option, "service".\nI don\'t know about any services named: `%s`', service));

    return Service;

  }

});

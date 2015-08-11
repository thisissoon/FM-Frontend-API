'use strict';
/**
 * Module dependencies
 */
var rest = require('restler');

/**
 * FM API Service
 *
 * @description :: Service for communicating with FM API
 */

var FM = rest.service(function(){}, {
  baseURL: 'http://localdocker:5000'
});

module.exports = new FM();

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


var FM = rest.service(function(u, p) {
  this.defaults.username = u;
  this.defaults.password = p;
}, {
  baseURL: 'http://localdocker:5000'
}, {
  update: function(track) {
    return this.put('/player/queue', track);
  }
});

module.exports = new fmAPI('', '');

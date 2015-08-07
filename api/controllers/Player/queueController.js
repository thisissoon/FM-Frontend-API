/**
 * Player/queueController
 *
 * @description :: Server-side logic for managing player/queues
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var rest = require('restler');

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

module.exports = {
  find: function (req, res) {
    var fm = new FM('', '');
    fm.get(req.url).on('complete', function (response) {
      res.send(response);
    });
  }
};


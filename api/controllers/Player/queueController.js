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

var get = function(req, res) {
  var fm = new FM('', '');
  fm.get(req.url).on('complete', function (response) {
    res.send(response);
  });
}

var post = function(req, res) {
  var fm = new FM('', '');
  fm.post(req.url).on('complete', function (response) {
    res.send(response);
  });
}

var update = function(req, res) {
  var fm = new FM('', '');
  fm.update(req.url).on('complete', function (response) {
    res.send(response);
  });
}

var del = function(req, res) {
  var fm = new FM('', '');
  fm.del(req.url).on('complete', function (response) {
    res.send(response);
  });
}

module.exports = {
  find: get,
  findOne: get,
  create: post,
  update: update,
  destroy: del
};


/**
 * Player/queueController
 *
 * @description :: Server-side logic for managing player/queues
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


var post = function(req, res) {
  var fm = new FM();

  fm.post(req.url, {
    data: JSON.stringify(req.body),
    headers: req.headers
  })
  .on('complete', function (data, response) {
    res.status(response.headers.status);
    res.send(data);
  });
}

var update = function(req, res) {
  var fm = new FM();
  fm.post(req.url, {
    data: JSON.stringify(req.body),
    headers: req.headers
  })
  .on('complete', function (data, response) {
    res.status(response.headers.status);
    res.send(data);
  });
}

var del = function(req, res) {
  var fm = new FM();
  fm.del(req.url)
    .on('complete', function (data, response) {
      res.status(response.headers.status);
      res.send(data);
    });
}

module.exports = {
  findOne: get,
  create: post,
  update: update,
  destroy: del
};


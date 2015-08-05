/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var rest = require('restler');

var Doit = rest.service(function(u, p) {
  this.defaults.username = u;
  this.defaults.password = p;
}, {
  baseURL: 'http://localdocker:5000'
}, {
  update: function(user) {
    return this.put('/', user);
  }
});

module.exports = {
  find: function (req, res) {
    var doit = new Doit('danwrong', 'password');;
    doit.get('/v1/users').on('complete', function (response) {
      res.send(response);
    });
  }
};


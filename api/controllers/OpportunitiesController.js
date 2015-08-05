/**
 * OpportunitiesController
 *
 * @description :: Server-side logic for managing opportunities
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var rest = require('restler');

var Doit = rest.service(function(u, p) {
  this.defaults.username = u;
  this.defaults.password = p;
}, {
  baseURL: 'http://localdocker:5000'
}, {
  update: function(opportunity) {
    return this.put('/', opportunity);
  }
});

module.exports = {
  find: function (req, res) {
    var doit = new Doit('danwrong', 'password');;
    doit.get('/v1/opportunities').on('complete', function (response) {
      res.send(response.data.items);
    });
  }
};


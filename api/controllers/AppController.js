'use strict';
/**
 * AppController
 *
 * @description :: Server-side logic for managing apps
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {



  /**
   * `AppController.index()`
   */
  index: function (req, res) {
    var options = {
          root: process.cwd() + '/.tmp/public/'
        },
        fileName = 'index.html';


    res.sendfile(fileName, options, function (err) {
      if (err) {
        sails.log.error(err);
        res.status(err.status).end();
      }
      else {
        sails.log.info('Sent:', fileName);
      }
    });
  }
};


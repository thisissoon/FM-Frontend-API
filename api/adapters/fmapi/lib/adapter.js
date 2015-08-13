'use strict';
/**
 * Module Dependencies
 */
var redis = require('redis');
var url = require('url');
var rest = require('restler');
var Connection = require('./connection');


/**
 * waterline-fmapi
 *
 * Most of the methods below are optional.
 *
 * If you don't need / can't get to every method, just implement
 * what you have time for.  The other methods will only fail if
 * you try to call them!
 *
 * For many adapters, this file is all you need.  For very complex adapters, you may need more flexiblity.
 * In any case, it's probably a good idea to start with one file and refactor only if necessary.
 * If you do go that route, it's conventional in Node to create a `./lib` directory for your private submodules
 * and load them at the top of the file with other dependencies.  e.g. var update = `require('./lib/update')`;
 */
module.exports = (function () {


  /**
   * Reference to each configured connection
   * @propety {Object} connections
   */
  var connections = {};



  // You may also want to store additional, private data
  // per-connection (esp. if your data store uses persistent
  // connections).
  //
  // Keep in mind that models can be configured to use different databases
  // within the same app, at the same time.
  //
  // i.e. if you're writing a MariaDB adapter, you should be aware that one
  // model might be configured as `host="localhost"` and another might be using
  // `host="foo.com"` at the same time.  Same thing goes for user, database,
  // password, or any other config.
  //
  // You don't have to support this feature right off the bat in your
  // adapter, but it ought to get done eventually.
  //

  var adapter = {

    syncable: false,

    identity: 'waterline-fmapi',

    // Default configuration for connections
    defaults: {
      port: 443,
      host: 'api.thisissoon.fm',
      protocol: 'https',
      redisUri: 'redis://redis:6379',
      redisChannel: 'fm:events',
      headers: {
        'Content-Type': 'application/json'
      }
    },



    /**
     *
     * This method runs when a model is initially registered
     * at server-start-time.  This is the only required method.
     *
     * @param  {[type]}   connection [description]
     * @param  {[type]}   collection [description]
     * @param  {Function} cb         [description]
     * @return {[type]}              [description]
     */
    registerConnection: function(connection, collections, cb) {

      if(!connection.identity) return cb(new Error('Connection is missing an identity.'));
      if(connections[connection.identity]) return cb(new Error('Connection is already registered.'));

      if (!connection.port) return cb('No port specified (e.g. 443');
      if (!connection.host) return cb('No host specified (e.g. api.thisissoon.fm');

      var baseURL = url.format({ protocol: connection.protocol, hostname: connection.host, port: connection.port });

      /**
       * FM API Service
       * @description :: Service for communicating with FM API
       */
      var FM = rest.service(function(){}, {
        baseURL: baseURL
      });

      // Save reference to connection
      connections[connection.identity] = {
        service: new FM(),
        _redisChannel: connection.redisChannel,
        _redisUri: connection.redisUri,
        headers: connection.headers
      };

      cb();
    },


    /**
     * Fired when a model is unregistered, typically when the server
     * is killed. Useful for tearing-down remaining open connections,
     * etc.
     *
     * @param  {Function} cb [description]
     * @return {[type]}      [description]
     */
    teardown: function (conn, cb) {

      if (typeof conn == 'function') {
        cb = conn;
        conn = null;
      }
      if (!conn) {
        connections = {};
        return cb();
      }
      if(!connections[conn]) return cb();
      delete connections[conn];
      cb();
    },


    // Return attributes
    describe: function (connection, collection, cb) {
      // Add in logic here to describe a collection (e.g. DESCRIBE TABLE logic)
      return cb();
    },

    /**
     *
     * REQUIRED method if users expect to call Model.find(), Model.findOne(),
     * or related.
     *
     * You should implement this method to respond with an array of instances.
     * Waterline core will take care of supporting all the other different
     * find methods/usages.
     *
     */
    find: function (connection, collection, options, cb) {
	  var connection = connections[connection];
      var collection = sails.models[collection];
      return Connection.find(connection, collection, options, cb);
    },

    create: function (connection, collection, values, cb) {
      var connection = connections[connection];
      var collection = sails.models[collection];
	  return Connection.create(connection, collection, values, cb);
    },

    update: function (connection, collection, options, values, cb) {
      var connection = connections[connection];
      var collection = sails.models[collection];
      return Connection.update(connection, collection, options, cb);
    },

    destroy: function (connection, collection, options, cb) {
      var connection = connections[connection];
      var collection = sails.models[collection];
      return Connection.destroy(connection, collection, options, cb);
    }

  };

  // Expose adapter definition
  return adapter;

})();




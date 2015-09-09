'use strict';
/**
 * Module dependencies
 */
var url = require('url'),
    pathToRegexp = require('path-to-regexp');

/**
 * Custom hooks for sails-rest adapter
 * @module sailsRest
 */

module.exports = {

  /**
   * Create an HTTP request URL from connection configuration, collection name and query options object.
   * If query options object contains an `id` field, the HTTP URL will be formatted as proto://pathname/collection/id.
   * Otherwise the HTTP URL will be formatted as proto://pathname/collection.
   *
   * @param {Request} req    - SuperAgent HTTP Request object
   * @param {String}  method - HTTP request method
   * @param {Object}  config - configuration object used to hold request-specific configuration. this is used to avoid polluting the connection's own configuration object.
   * @param {Object}  conn   - connection configuration object:
   *                         - {Object} connection - Waterline connection configuration object
   *                         - {String} collection - collection name. appended to API pathname.
   *                           For example, given the api `http://localhost:8080/api/v1`,
   *                           a collection named `user` will resolve to `http://localhost:8080/api/v1/user`.
   *                           A custom url pattern can be set in `url` key on model `users/:id/stats`, this will resolve to  `users/1/stats` using route options
   *                         - {Object} options - query options object. contains query conditions (`where`), sort, limit etc. as per Waterline's API.
   *                         - {Array<Object>} values - values of records to create.
   */
  createEndpoint: function createEndpoint(req, method, config, conn){
    var modelUrl = '/' + sails.models[conn.collection].url;

    if (modelUrl){
      // resolve service URL from model.url and options
      // eg. /users/:user/stats => /users/1/stats
      var toPath = pathToRegexp.compile(modelUrl),
          options = conn.options;

      config.endpoint = url.resolve(conn.connection.endpoint, toPath(options));
      // need to remove resolve options to avoid attaching again as query params

    } else if(_.isObject(conn.options) && conn.options.hasOwnProperty('id')){
      // resolve url from model identity and id eg. /users/1
      config.endpoint = url.resolve(conn.connection.endpoint + '/', conn.collection + '/' + conn.options.id);
      delete conn.options.id;

    } else {
      // resolve url from model identity eg. /users
      config.endpoint = url.resolve(conn.connection.endpoint + '/', conn.collection);
    }
  }

};

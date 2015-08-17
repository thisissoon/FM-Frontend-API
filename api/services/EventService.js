'use strict';
/**
 * Module dependencies
 * @external
 */
var redis = require('redis'),
    url = require('url');

/**
 * Redis client
 * @property {Object} client
 */
var client;

/**
 * Connection config to use for redis pub/sub
 * @property {String} connectionName
 */
var connectionName = 'fmEvents';

/**
 * Redis pub/sub connection configuration
 * @property {Object} connection
 */
var connection = sails.config.connections[connectionName];


module.exports = {

  /**
   * Initialise redis connection and event handlers
   * @method init
   */
  init: function init () {
    if (connection.host) {
      client = redis.createClient(
        url.parse(connection.host).port,
        url.parse(connection.host).hostname
      );
      client.on('ready', this.onReady);
      client.on('error', function (err) {
        sails.log.error(err);
      });
      client.on('message', this.handleMessage);
    }
  },

  /**
   * Subscribe to redis channel
   * @method onReady
   */
  onReady: function onReady () {
    client.subscribe(connection.channel);
    sails.log.info('Connected to redis at ' + connection.host);
    sails.log.info('Subscribed to ' + connection.channel);
  },

  /**
   * Map redis events to resources
   * @method handleMessage
   */
  handleMessage: function handleMessage (event, message) {

    sails.log.debug(event, message);
    message = JSON.parse(message);

    switch(message.event) {
      case 'add':
        sails.models['player/queue'].publishCreate({ uri: message.uri });
        break;
      case 'play':
        sails.models['player/queue'].publishDestroy({ uri: message.uri });
        // publishUpdate on player/current
        break;
      case 'end':
        // publishUpdate on player/current
        break;
      case 'pause':
        // publishCreate on player/pause
        break;
      case 'resume':
        // publishDestroy on player/pause
        break;
      case 'volume_changed':
        // publishUpdate on player/volume
        break;
      case 'mute_changed':
        // publishUpdate on player/mute
        break;
      default:
        sails.log.debug('Unmatched redis event: ' + message.event);
        break;
    }

  }

};

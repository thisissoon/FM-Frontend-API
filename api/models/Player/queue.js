'use strict';
/**
* Player/queue.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  // required for blueprint routes to work with nested directory structure
  identity: 'player/queue',

  autoPk: false,
  autoCreatedAt: false,
  autoUpdatedAt: false,

  attributes: {

    uri: {
      type: 'string',
      primaryKey: true
    }

  }
};


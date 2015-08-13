/**
* Player/queue.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  connection: 'fmApi',

  url: '/player/queue',

  autoCreatedAt: false,
  autoUpdatedAt: false,
  autoPK: false,

  attributes: {

    id: {
      type: 'string'
    },

    uri: {
      type: 'string',
      required: true
    }

  }
};


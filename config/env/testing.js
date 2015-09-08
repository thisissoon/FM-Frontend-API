/**
 * Testing environment settings
 */

module.exports = {

  environment: 'testing',

  hooks: {
      grunt: false
  },

  log: {
      level: 'silent'
  },

  models: {
      migrate: 'drop'
  },

  connections: {

    // Use the local disk development DB instead of API
    fm: {
      adapter: 'sails-disk'
    },

    // Disbale redis events
    fmEvents: {
      host: ''
    }

  }

};

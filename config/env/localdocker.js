/**
 * Localdocker development environment settings
 */

module.exports = {

  connections: {

    fm: {
      host: 'localdocker:5000'
    },

    fmEvents: {
      host: 'redis://localdocker:6379'
    }

  }

};

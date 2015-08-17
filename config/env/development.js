/**
 * Development environment settings
 *
 * This file can include shared settings for a development team,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

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

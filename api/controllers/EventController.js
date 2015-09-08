'use strict';
/**
 * EventController
 *
 * @description :: Server-side logic for managing Events
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  /**
   * Provides endpoint to handle incoming events
   * @method post
   * @param {Object} req  Express request
   * @param {Object} res  Express resonse
   */
  post: function post (req, res) {

    switch(req.body._event) {
      case 'add':
        sails.models['player/queue'].publishCreate({ uri: req.body.uri });
        break;
      case 'play':
        sails.models['player/queue'].publishDestroy({ uri: req.body.uri });
        sails.models['player/current'].publishUpdate();
        break;
      case 'end':
        sails.models['player/current'].publishUpdate();
        break;
      case 'pause':
        // publishCreate on player/pause
        break;
      case 'resume':
        // publishDestroy on player/pause
        break;
      case 'volume_changed':
        sails.models['player/volume'].publishUpdate();
        break;
      case 'mute_changed':
        sails.models['player/mute'].publishUpdate();
        break;
      default:
        sails.log.debug('Invalid event: ' + req.body._event);
        return res.badRequest({ _errors: { _event: 'Event \'' + req.body._event + '\' is invalid.' }});
        break;
    }

    return res.status(202).json({ message: 'All is well. The event will be passed on to FE socket subscribers.' });

  }

};


/**
 * Integration tests for /api/events
 * @module events
 */

var crypto = require('crypto');

describe('Events', function () {

  describe('POST /api/events', function () {

    var eventData, signature

    beforeEach(function () {
      sails.config.clients.test = 'a1b2c3d4';

      eventData = {
        _event: 'add'
      }

      signature = crypto.createHmac('sha256', 'a1b2c3d4').update(eventData.toString()).digest('base64');
    });

    it('should handle add event', function (done) {

      var publishCreate = sinon.stub(sails.models['player/queue'], 'publishCreate');
      eventData.uri = 1;

      request
        .post('/api/events')
        .set('Signature', 'test:' + signature)
        .send(eventData)
        .expect('Content-Type', /json/)
        .expect(202)
        .expect(function(res){
          expect(res.body.message).to.equal('All is well. The event will be passed on to FE socket subscribers.');
          expect(publishCreate).to.have.been.calledWith({ uri: 1 });
        })
        .end(done);
    });

    it('should handle play event', function (done) {

      eventData._event = 'play';
      eventData.uri = 1;

      var publishDestroy = sinon.stub(sails.models['player/queue'], 'publishDestroy');
      var publishUpdate = sinon.stub(sails.models['player/current'], 'publishUpdate');

      request
        .post('/api/events')
        .set('Signature', 'test:' + signature)
        .send(eventData)
        .expect('Content-Type', /json/)
        .expect(202)
        .expect(function(res){
          expect(res.body.message).to.equal('All is well. The event will be passed on to FE socket subscribers.');
          expect(publishDestroy).to.have.been.calledWith({ uri: 1 });
          expect(publishUpdate).to.have.been.calledWith();
        })
        .end(done);
    });

    it('should return error for invalid event', function (done) {

      eventData._event = 'somethingRandom';

      request
        .post('/api/events')
        .set('Signature', 'test:' + signature)
        .send(eventData)
        .expect('Content-Type', /json/)
        .expect(400)
        .expect(function(res){
          expect(res.body._errors._event).to.equal('Event \'somethingRandom\' is invalid.');
        })
        .end(done);
    });

    it('should return bad request for invalid signature', function (done) {

      signature = crypto.createHmac('sha256', 'something-wrong').update(eventData.toString()).digest('base64');

      request
        .post('/api/events')
        .set('Signature', 'test:' + signature)
        .send(eventData)
        .expect('Content-Type', /json/)
        .expect(400)
        .expect(function(res){
          expect(res.body._errors.signature).to.equal('Invalid Signature');
        })
        .end(done);
    });

    it('should return bad request for no signature', function (done) {
      request
        .post('/api/events')
        .send(eventData)
        .expect('Content-Type', /json/)
        .expect(400)
        .expect(function(res){
          expect(res.body._errors.signature).to.equal('Invalid Signature');
        })
        .end(done);
    });

  });

});

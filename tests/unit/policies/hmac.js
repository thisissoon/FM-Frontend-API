/**
 * Unit tests for HMAC Policy
 * @module hmac
 */

describe('Policy: HMAC', function () {

  var hmac = require('../../../api/policies/hmac'),
      crypto = require('crypto'),
      req, res, next;

  beforeEach(function () {

    sails.config.clients = {
      test: 'a1b2c3d4'
    };

    req = {
      headers: {},
      body: {}
    };

    res = {
      badRequest: sinon.spy()
    };

    next = sinon.spy();

    req.headers.signature = 'test:' + crypto.createHmac('sha256', sails.config.clients.test).update(req.body.toString()).digest('base64');

  });


  it('should return bad request for no signature', function () {
    delete req.headers.signature;
    hmac(req, res, next);
    expect(res.badRequest).to.have.been.calledWith({ _errors: { signature: 'Invalid Signature' } });
  });

  it('should return bad request for unrecognised client', function () {
    req.headers.signature = 'unknown:1234';
    hmac(req, res, next);
    expect(res.badRequest).to.have.been.calledWith({ _errors: { signature: 'Invalid Signature' } });
  });

  it('should return bad request for invalid signature', function () {
    req.headers.signature = 'test:invalidsig';
    hmac(req, res, next);
    expect(res.badRequest).to.have.been.calledWith({ _errors: { signature: 'Invalid Signature' } });
  });

  it('should call next middleware if verification passes', function () {
    hmac(req, res, next);
    expect(next).to.have.been.calledWith();
  });

});

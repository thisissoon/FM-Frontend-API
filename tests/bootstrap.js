'use strict';

var SailsApp = require('sails').Sails,
    Sails,
    chai = require('chai'),
    sinonChai = require('sinon-chai'),
    request = require('supertest'),
    testConfig = require('../config/env/testing');

global.expect = chai.expect;
global.sinon = require('sinon');

chai.use(sinonChai);

before(function(done) {
    Sails = new SailsApp();
    Sails.lift(testConfig, function(err, sails) {
        if (err) {
            return done(err);
        }

        global.sails = sails;
        global.request = request.agent(sails.hooks.http.app);

        return done(err, sails);
    });
});

after(function(done) {
    Sails.lower(done);
});

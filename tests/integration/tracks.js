describe('Tracks', function () {

  describe('GET /api/tracks', function () {

    it('should return an array', function (done) {

      request
        .get('/api/tracks')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(function(res){
          expect(res.body).to.be.a('array');
        })
        .end(done);

    });

  });

});

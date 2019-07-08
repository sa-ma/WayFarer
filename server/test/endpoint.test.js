import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.should();
chai.use(chaiHttp);

describe('Test for endpoints', () => {
  describe('Test for endpoint', () => {
    // Return 200 if successful and request made to /api/v1
    it('should return 200 and load successfully', (done) => {
      chai
        .request(app)
        .get('/api/v1/')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          done();
        });
    });

    // Return 404 if request made to unknown endpoint
    it('should return 404 if endpoint unknown', (done) => {
      chai
        .request(app)
        .get('/api/v1/fail')
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });

    // Return 401 if token is invalid
    it('should return 401 if token is invalid', (done) => {
      const trip = {
        busId: '1',
        origin: 'Lagos',
        destination: 'Abuja',
        tripDate: '2020-12-29',
        fare: 8000
      };

      chai
        .request(app)
        .post('/api/v1/trips')
        .send(trip)
        .set('x-auth-token', 'invalid token')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.should.have.property('error');
          done();
        });
    });

    // Return 403 if token isn't authorized
    it('should return 403 if token is not authorized', (done) => {
      const user = {
        email: 'sama@aa.aa',
        password: '12345'
      };
      const trip = {
        busId: '1',
        origin: 'Lagos',
        destination: 'Abuja',
        tripDate: '2020-12-29',
        fare: 8000
      };
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(user)
        .end((autherr, authres) => {
          const { token } = authres.body.data;
          chai
            .request(app)
            .post('/api/v1/trips')
            .send(trip)
            .set('x-auth-token', token)
            .end((err, res) => {
              res.should.have.status(403);
              res.body.should.be.a('object');
              res.should.have.property('error');
              done();
            });
        });
    });
  });
});

import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.should();
chai.use(chaiHttp);
const signinUrl = '/api/v1/auth/signin';
const tripUrl = '/api/v1/trips';

describe('Test for Trips Endpoints', () => {
  // Create Trip TESTS
  describe(`POST ${tripUrl}`, () => {
    // return 201 if trip is created
    it('should return 201 and successfully create a new trip', (done) => {
      const loginUser = {
        email: 'admin@aa.aa',
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
        .post(signinUrl)
        .send(loginUser)
        .end((autherr, authres) => {
          const { token } = authres.body.data;
          chai
            .request(app)
            .post(tripUrl)
            .send(trip)
            .set('x-auth-token', token)
            .end((err, res) => {
              res.should.have.status(201);
              res.body.should.be.an('object');
              res.body.should.have.property('status');
              res.body.should.have.property('data');
              res.body.data.should.be.an('object');
              res.body.data.should.have.property('trip_id').which.is.a('number');
              res.body.data.should.have.property('bus_id').which.is.a('number');
              res.body.data.should.have.property('origin').which.is.a('string');
              res.body.data.should.have.property('destination').which.is.a('string');
              res.body.data.should.have.property('trip_date').which.is.a('string');
              res.body.data.should.have.property('fare');
              done();
            });
        });
    });

    // return 400 if busId is not inputed
    it('should return 400 if busId is not inserted', (done) => {
      const loginUser = {
        email: 'admin@aa.aa',
        password: '12345'
      };
      const trip = {
        origin: 'Lagos',
        destination: 'Abuja',
        tripDate: '2020-12-29',
        fare: 8000
      };
      chai
        .request(app)
        .post(signinUrl)
        .send(loginUser)
        .end((autherr, authres) => {
          const { token } = authres.body.data;
          chai
            .request(app)
            .post(tripUrl)
            .send(trip)
            .set('x-auth-token', token)
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.an('object');
              res.body.should.have.property('error');
              done();
            });
        });
    });

    // return 409 if busId is not found
    it('should return 409 if busId is not found', (done) => {
      const loginUser = {
        email: 'admin@aa.aa',
        password: '12345'
      };
      const trip = {
        busId: '1001',
        origin: 'Lagos',
        destination: 'Abuja',
        tripDate: '2020-12-29',
        fare: 8000
      };
      chai
        .request(app)
        .post(signinUrl)
        .send(loginUser)
        .end((autherr, authres) => {
          const { token } = authres.body.data;
          chai
            .request(app)
            .post(tripUrl)
            .send(trip)
            .set('x-auth-token', token)
            .end((err, res) => {
              res.should.have.status(409);
              res.body.should.be.an('object');
              res.body.should.have.property('error').which.is.equal('Bus not found');
              done();
            });
        });
    });

    // return 400 if origin is not inputed
    it('should return 400 if origin is not inserted', (done) => {
      const loginUser = {
        email: 'admin@aa.aa',
        password: '12345'
      };
      const trip = {
        busId: '1',
        destination: 'Abuja',
        tripDate: '2020-12-29',
        fare: 8000
      };
      chai
        .request(app)
        .post(signinUrl)
        .send(loginUser)
        .end((autherr, authres) => {
          const { token } = authres.body.data;
          chai
            .request(app)
            .post(tripUrl)
            .send(trip)
            .set('x-auth-token', token)
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.an('object');
              res.body.should.have.property('error');
              done();
            });
        });
    });

    // return 400 if destination is not inputed
    it('should return 400 if destination is not inserted', (done) => {
      const loginUser = {
        email: 'admin@aa.aa',
        password: '12345'
      };
      const trip = {
        busId: '1',
        origin: 'Lagos',
        tripDate: '2020-12-29',
        fare: 8000
      };
      chai
        .request(app)
        .post(signinUrl)
        .send(loginUser)
        .end((autherr, authres) => {
          const { token } = authres.body.data;
          chai
            .request(app)
            .post(tripUrl)
            .send(trip)
            .set('x-auth-token', token)
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.an('object');
              res.body.should.have.property('error');
              done();
            });
        });
    });

    // return 400 if trip date is not inserted
    it('should return 400 if trip date is not inserted', (done) => {
      const loginUser = {
        email: 'admin@aa.aa',
        password: '12345'
      };
      const trip = {
        busId: '1',
        origin: 'Lagos',
        destination: 'Abuja',
        fare: 8000
      };
      chai
        .request(app)
        .post(signinUrl)
        .send(loginUser)
        .end((autherr, authres) => {
          const { token } = authres.body.data;
          chai
            .request(app)
            .post(tripUrl)
            .send(trip)
            .set('x-auth-token', token)
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.an('object');
              res.body.should.have.property('error');
              done();
            });
        });
    });

    // return 400 if fare is not inserted
    it('should return 400 if fare is not inserted', (done) => {
      const loginUser = {
        email: 'admin@aa.aa',
        password: '12345'
      };
      const trip = {
        busId: '1',
        origin: 'Lagos',
        destination: 'Abuja',
        tripDate: '2020-12-29',
      };
      chai
        .request(app)
        .post(signinUrl)
        .send(loginUser)
        .end((autherr, authres) => {
          const { token } = authres.body.data;
          chai
            .request(app)
            .post(tripUrl)
            .send(trip)
            .set('x-auth-token', token)
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.an('object');
              res.body.should.have.property('error');
              done();
            });
        });
    });
  });
});

import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.should();
chai.use(chaiHttp);
const signinUrl = '/api/v1/auth/signin';
const bookingUrl = '/api/v1/bookings';

describe('Test for Booking Endpoints', () => {
  // Create Booking TESTS
  describe(`POST ${bookingUrl}`, () => {
    // return 201 if booking is created
    it('should return 201 and successfully create a new booking', (done) => {
      const loginUser = {
        email: 'admin@aa.aa',
        password: '12345'
      };
      const booking = {
        tripId: 1,
      };
      chai
        .request(app)
        .post(signinUrl)
        .send(loginUser)
        .end((autherr, authres) => {
          const { token } = authres.body.data;
          chai
            .request(app)
            .post(bookingUrl)
            .send(booking)
            .set('x-auth-token', token)
            .end((err, res) => {
              res.should.have.status(201);
              res.body.should.be.an('object');
              res.body.should.have.property('status');
              res.body.should.have.property('data');
              res.body.data.should.be.an('object');
              res.body.data.should.have.property('booking_id').which.is.a('number');
              res.body.data.should.have.property('user_id').which.is.a('number');
              res.body.data.should.have.property('trip_id').which.is.a('number');
              res.body.data.should.have.property('bus_id').which.is.a('number');
              res.body.data.should.have.property('trip_date').which.is.a('string');
              res.body.data.should.have.property('seat_number').which.is.a('number');
              res.body.data.should.have.property('first_name').which.is.a('string');
              res.body.data.should.have.property('last_name').which.is.a('string');
              res.body.data.should.have.property('email').which.is.a('string');
              done();
            });
        });
    });

    // return 409 if trip already booked
    it('should return 409 if trip already booked', (done) => {
      const loginUser = {
        email: 'admin@aa.aa',
        password: '12345'
      };
      const booking = {
        tripId: 1,
      };
      chai
        .request(app)
        .post(signinUrl)
        .send(loginUser)
        .end((autherr, authres) => {
          const { token } = authres.body.data;
          chai
            .request(app)
            .post(bookingUrl)
            .send(booking)
            .set('x-auth-token', token)
            .end((err, res) => {
              res.should.have.status(409);
              res.body.should.be.an('object');
              res.body.should.have.property('error');
              done();
            });
        });
    });

    // return 404 if trip not found
    it('should return 404 if trip not found', (done) => {
      const loginUser = {
        email: 'admin@aa.aa',
        password: '12345'
      };
      const booking = {
        tripId: 1111,
      };
      chai
        .request(app)
        .post(signinUrl)
        .send(loginUser)
        .end((autherr, authres) => {
          const { token } = authres.body.data;
          chai
            .request(app)
            .post(bookingUrl)
            .send(booking)
            .set('x-auth-token', token)
            .end((err, res) => {
              res.should.have.status(404);
              res.body.should.be.an('object');
              res.body.should.have.property('error');
              done();
            });
        });
    });

    // return 400 if tripId is not inputed
    it('should return 400 if tripId is not inserted', (done) => {
      const loginUser = {
        email: 'admin@aa.aa',
        password: '12345'
      };
      const booking = {
      };
      chai
        .request(app)
        .post(signinUrl)
        .send(loginUser)
        .end((autherr, authres) => {
          const { token } = authres.body.data;
          chai
            .request(app)
            .post(bookingUrl)
            .send(booking)
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

  // Get  all booking TESTS
  describe(`GET ${bookingUrl}`, () => {
    // return 200 if all trips are fetched
    it('should return 200 and get all trips', (done) => {
      const loginUser = {
        email: 'admin@aa.aa',
        password: '12345'
      };
      chai
        .request(app)
        .post(signinUrl)
        .send(loginUser)
        .end((autherr, authres) => {
          const { token } = authres.body.data;
          chai
            .request(app)
            .get(bookingUrl)
            .set('x-auth-token', token)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.an('object');
              res.body.should.have.property('status');
              res.body.should.have.property('data');
              res.body.data.should.be.an('array');
              res.body.data[0].should.have.property('booking_id').which.is.a('number');
              res.body.data[0].should.have.property('user_id').which.is.a('number');
              res.body.data[0].should.have.property('trip_id').which.is.a('number');
              res.body.data[0].should.have.property('bus_id').which.is.a('number');
              res.body.data[0].should.have.property('trip_date').which.is.a('string');
              res.body.data[0].should.have.property('seat_number').which.is.a('number');
              res.body.data[0].should.have.property('first_name').which.is.a('string');
              res.body.data[0].should.have.property('last_name').which.is.a('string');
              res.body.data[0].should.have.property('email').which.is.a('string');
              done();
            });
        });
    });
  });
});

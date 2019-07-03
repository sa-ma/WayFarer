import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.should();
chai.use(chaiHttp);
const url = '/api/v1/auth/';

describe('Test for Authentication Endpoints', () => {
  // SIGN UP TESTS
  describe(`POST ${url}signup`, () => {
    // return 201 if user created
    it('should return 201 and successfully create a new user', (done) => {
      const user = {
        email: 'aa@aa.aa',
        firstName: 'Sama',
        lastName: 'Bala',
        password: '123456'
      };
      chai
        .request(app)
        .post(`${url}signup`)
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.an('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          res.body.data.should.be.an('object');
          res.body.data.should.have.property('user_id').which.is.a('number');
          res.body.data.should.have.property('is_admin').which.is.a('boolean');
          res.body.data.should.have.property('token').which.is.a('string');
          done();
        });
    });
    // return 400 if firstName is not provided
    it('should return 400 if first name is not inserted', (done) => {
      const user = {
        lastName: 'Bala',
        email: 'aa@aa.aa',
        password: '123456'
      };
      chai
        .request(app)
        .post(`${url}signup`)
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          res.body.should.have.property('error');
          done();
        });
    });
    // return 400 if lastName is not provided
    it('should return 400 if last name is not inserted', (done) => {
      const user = {
        firstName: 'Bala',
        email: 'aa@aa.aa',
        password: '123456'
      };
      chai
        .request(app)
        .post(`${url}signup`)
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          res.body.should.have.property('error');
          done();
        });
    });
    // return 400 if email is not provided
    it('should return 400 if email is not inserted', (done) => {
      const user = {
        firstName: 'Sama',
        lastName: 'Bala',
        password: '123456'
      };
      chai
        .request(app)
        .post(`${url}signup`)
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          res.body.should.have.property('error');
          done();
        });
    });
    // return 400 if password is not provided
    it('should return 400 if password is not inserted', (done) => {
      const user = {
        email: 'aa@aa.aa',
        firstName: 'Sama',
        lastName: 'Bala',
      };
      chai
        .request(app)
        .post(`${url}signup`)
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          res.body.should.have.property('error');
          done();
        });
    });
    // return 409 if email is taken
    it('should return 409 if email is taken', (done) => {
      const user = {
        email: 'aa@aa.aa',
        firstName: 'Sama',
        lastName: 'Bala',
        password: '123456'
      };
      chai
        .request(app)
        .post(`${url}signup`)
        .send(user)
        .end((err, res) => {
          res.should.have.status(409);
          res.body.should.be.an('object');
          res.body.should.have.property('status');
          res.body.should.have.property('error');
          done();
        });
    });
  });

  // SIGN IN TESTS
  describe(`POST ${url}signin`, () => {
    // return 200 if user is signed in
    it('should return 200 and signs in user', (done) => {
      const user = {
        email: 'ben@aa.aa',
        password: '12345'
      };
      chai
        .request(app)
        .post(`${url}signin`)
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          res.body.data.should.be.an('object');
          res.body.data.should.have.property('user_id').which.is.a('number');
          res.body.data.should.have.property('is_admin').which.is.a('boolean');
          res.body.data.should.have.property('token').which.is.a('string');
          done();
        });
    });
    // return 400 if email is not provided
    it('should return 400 if email is not inserted', (done) => {
      const user = {
        password: '$2y$10$t1ZYG4Ct8DIjyXheqspKr.vPq8krK6NwroY3iQEfrkYDpdAPYBG3m'
      };
      chai
        .request(app)
        .post(`${url}signin`)
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          res.body.should.have.property('error');
          done();
        });
    });
    // return 400 if password is not provided
    it('should return 400 if password is not inserted', (done) => {
      const user = {
        email: 'ben@aa.aa',
      };
      chai
        .request(app)
        .post(`${url}signin`)
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          res.body.should.have.property('error');
          done();
        });
    });
  });
});

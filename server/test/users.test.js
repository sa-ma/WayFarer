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
        first_name: 'Sama',
        last_name: 'Bala',
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
    // return 400 if first_name is not provided
    it('should return 400 if first name is not inserted', (done) => {
      const user = {
        last_name: 'Bala',
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
          res.body.should.have.property('error').which.is.an('array');
          done();
        });
    });
    // return 400 if last_name is not provided
    it('should return 400 if last name is not inserted', (done) => {
      const user = {
        first_name: 'Bala',
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
          res.body.should.have.property('error').which.is.an('array');
          done();
        });
    });
    // return 400 if email is not provided
    it('should return 400 if email is not inserted', (done) => {
      const user = {
        first_name: 'Sama',
        last_name: 'Bala',
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
        first_name: 'Sama',
        last_name: 'Bala',
        email: 'aa@aa.aa'
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
        first_name: 'Sama',
        last_name: 'Bala',
        email: 'aa@aa.aa',
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
});

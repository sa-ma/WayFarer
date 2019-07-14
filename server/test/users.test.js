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
          res.body.should.have.property('error');
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
          res.body.should.have.property('error');
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
        email: 'aa@aa.aa',
        first_name: 'Sama',
        last_name: 'Bala',
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
        first_name: 'Sama',
        last_name: 'Bala',
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
        email: 'sama@aa.aa',
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

  // Create Admin TESTS
  describe(`POST ${url}admin`, () => {
    // return 201 if admin created
    it('should return 201 and successfully create a new admin', (done) => {
      const loginUser = {
        email: 'admin@aa.aa',
        password: '12345'
      };
      const user = {
        email: 'way_admin@aa.aa',
        first_name: 'Admin',
        last_name: 'Admin',
        password: '123456'
      };
      chai
        .request(app)
        .post(`${url}signin`)
        .send(loginUser)
        .end((autherr, authres) => {
          const { token } = authres.body.data;
          chai
            .request(app)
            .post(`${url}admin`)
            .send(user)
            .set('token', token)
            .end((err, res) => {
              res.should.have.status(201);
              res.body.should.be.an('object');
              res.body.should.have.property('status');
              res.body.should.have.property('data');
              res.body.data.should.be.an('object');
              res.body.data.should.have.property('user_id').which.is.a('number');
              res.body.data.should.have.property('is_admin').which.is.a('boolean').which.is.equal(true);
              done();
            });
        });
    });
    // return 400 if first_name is not provided
    it('should return 400 if first name is not inserted', (done) => {
      const loginUser = {
        email: 'admin@aa.aa',
        password: '12345'
      };
      const user = {
        last_name: 'Bala',
        email: 'aa@aa.aa',
        password: '123456'
      };
      chai
        .request(app)
        .post(`${url}signin`)
        .send(loginUser)
        .end((autherr, authres) => {
          const { token } = authres.body.data;
          chai
            .request(app)
            .post(`${url}admin`)
            .send(user)
            .set('token', token)
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.an('object');
              res.body.should.have.property('error');
              done();
            });
        });
    });
    // return 400 if last_name is not provided
    it('should return 400 if last name is not inserted', (done) => {
      const loginUser = {
        email: 'admin@aa.aa',
        password: '12345'
      };
      const user = {
        first_name: 'Bala',
        email: 'aa@aa.aa',
        password: '123456'
      };
      chai
        .request(app)
        .post(`${url}signin`)
        .send(loginUser)
        .end((autherr, authres) => {
          const { token } = authres.body.data;
          chai
            .request(app)
            .post(`${url}admin`)
            .send(user)
            .set('token', token)
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.an('object');
              res.body.should.have.property('error');
              done();
            });
        });
    });
    // return 400 if email is not provided
    it('should return 400 if email is not inserted', (done) => {
      const loginUser = {
        email: 'admin@aa.aa',
        password: '12345'
      };
      const user = {
        first_name: 'Sama',
        last_name: 'Bala',
        password: '123456'
      };
      chai
        .request(app)
        .post(`${url}signin`)
        .send(loginUser)
        .end((autherr, authres) => {
          const { token } = authres.body.data;
          chai
            .request(app)
            .post(`${url}admin`)
            .send(user)
            .set('token', token)
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.an('object');
              res.body.should.have.property('error');
              done();
            });
        });
    });
    // return 400 if password is not provided
    it('should return 400 if password is not inserted', (done) => {
      const loginUser = {
        email: 'admin@aa.aa',
        password: '12345'
      };
      const user = {
        email: 'aa@aa.aa',
        first_name: 'Sama',
        last_name: 'Bala',
      };
      chai
        .request(app)
        .post(`${url}signin`)
        .send(loginUser)
        .end((autherr, authres) => {
          const { token } = authres.body.data;
          chai
            .request(app)
            .post(`${url}admin`)
            .send(user)
            .set('token', token)
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.an('object');
              res.body.should.have.property('error');
              done();
            });
        });
    });
    // return 409 if email is taken
    it('should return 409 if email is taken', (done) => {
      const loginUser = {
        email: 'admin@aa.aa',
        password: '12345'
      };
      const user = {
        email: 'aa@aa.aa',
        first_name: 'Sama',
        last_name: 'Bala',
        password: '123456'
      };
      chai
        .request(app)
        .post(`${url}signin`)
        .send(loginUser)
        .end((autherr, authres) => {
          const { token } = authres.body.data;
          chai
            .request(app)
            .post(`${url}admin`)
            .send(user)
            .set('token', token)
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
});

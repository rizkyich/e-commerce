const chai = require('chai')
const chaiHTTP = require('chai-http')
const app = require('../app')
const expect = chai.expect
const User = require('../models/user')
const { hashPassword } = require('../helpers/bcrypt')
chai.use(chaiHTTP)

describe('Users', function () {
  let user
  describe('POST /users/register', function () {
    beforeEach(function (done) {
      user = { email: 'admin@m.com', password: 'admin', username: 'admin', role: 'admin' }
      User.deleteMany({})
        .then(_ => done())
        .catch(console.log)
    })

    it('should return invalid email format', function (done) {
      user.email = 'emailsalah'
      chai.request(app)
        .post('/users/register')
        .send(user)
        .end(function (err, res) {
          if (err) done(err)
          else {
            expect(res.status).to.equal(400)
            expect(res.body.message).to.include('Invalid email format')
            done()
          }
        })
    })

    it('should return invalid min length username', function (done) {
      user.username = 'qwer'
      chai.request(app)
        .post('/users/register')
        .send(user)
        .end(function (err, res) {
          if (err) done(err)
          else {
            expect(res.status).to.equal(400)
            expect(res.body.message).to.include('Your username needs to be at least 5 letters')
            done()
          }
        })
    })

    it('should return invalid min length password', function (done) {
      user.password = 'qwer'
      chai.request(app)
        .post('/users/register')
        .send(user)
        .end(function (err, res) {
          if (err) done(err)
          else {
            expect(res.status).to.equal(400)
            expect(res.body.message).to.include('Your password needs to be at least 5 letters')
            done()
          }
        })
    })

    it('should return error empty email', function (done) {
      user.email = ''
      chai.request(app)
        .post('/users/register')
        .send(user)
        .end(function (err, res) {
          if (err) done(err)
          else {
            expect(res.status).to.equal(400)
            expect(res.body.message).to.include('Email must be filled')
            done()
          }
        })
    })

    it('should return error empty password', function (done) {
      user.password = ''
      chai.request(app)
        .post('/users/register')
        .send(user)
        .end(function (err, res) {
          if (err) done(err)
          else {
            expect(res.status).to.equal(400)
            expect(res.body.message).to.equal('Password must be filled')
            done()
          }
        })
    })

    it('should return error empty username', function (done) {
      user.username = ''
      chai.request(app)
        .post('/users/register')
        .send(user)
        .end(function (err, res) {
          if (err) done(err)
          else {
            expect(res.status).to.equal(400)
            expect(res.body.message).to.equal('Username must be filled')
            done()
          }
        })
    })

    it('should return new user', function (done) {
      chai.request(app)
        .post('/users/register')
        .send(user)
        .end(function (err, res) {
          if (err) done(err)
          else {
            expect(res.status).to.equal(201)
            expect(res.body.username).to.equal(user.username)
            expect(res.body.email).to.equal(user.email)
            expect(res.body.role).to.equal(user.role)
            expect(res.body.password).to.equal(hashPassword(user.password))
            done()
          }
        })
    })

    it('should return error duplicate user', function (done) {
      chai.request(app)
        .post('/users/register')
        .send(user)
        .end(function (err, res) {
          if (err) done(err)
          else {
            chai.request(app)
              .post('/users/register')
              .send(user)
              .end(function (err, res) {
                if (err) done(err)
                else {
                  expect(res.status).to.equal(400)
                  done()
                }
              })
          }
        })
    })

  })

  describe('POST /users/login', function () {
    beforeEach(function () {
      user = { email: "admin@m.com", password: "admin", username: "admin" }
    })
    it('should get the token, email and username', function (done) {
      const login = {
        email: user.email,
        password: user.password
      }
      chai.request(app)
        .post('/users/login')
        .send(login)
        .end(function (err, res) {
          if (err) done(err)
          else {
            
            expect(res.status).to.equal(200)
            expect(res.body.username).to.equal(user.username)
            done()
          }
        })
    })

    it('should get Wrong password error', function (done) {
      const login = {
        email: user.email,
        password: 'password salah'
      }
      chai.request(app)
        .post('/users/login')
        .send(login)
        .end(function (err, res) {
          if (err) done(err)
          else {
            console.log(res.body)
            expect(res.status).to.equal(404)
            expect(res.body.message).to.equal('Invalid Password')
            done()
          }
        })
    })
    it('should get User not found error', function (done) {
      const login = {
        email: 'tole',
        password: 'asssasasa'
      }
      chai.request(app)
        .post('/users/login')
        .send(login)
        .end(function (err, res) {
          if (err) done(err)
          else {
            expect(res.status).to.equal(404)
            expect(res.body.message).to.equal('User does not exist')
            done()
          }
        })
    })


  })

})
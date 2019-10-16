const chai = require('chai')
const chaiHTTP = require('chai-http')
const app = require('../app')
const Product = require('../models/product')
chai.use(chaiHTTP)
const expect = chai.expect

describe('Products', function () {
  let product = null
  let token = null

  const login = {
    email: "admin@m.com",
    password: "admin"
  }

  before(function (done) {
    chai.request(app)
      .post('/users/login')
      .send(login)
      .end(function (err, res) {
        if (err) done(err)
        else {
          token = res.body.token
          done()
        }
      })
  })

  describe('/products after login', function () {
    beforeEach(function (done) {
      product = {
        itemName: "Shishako",
        description: "Kain doang",
        price: 3000000,
        qty: 5,
        itemType: 'Jacket',
      }

      Product.deleteMany({})
        .then(_ => done())
        .catch(console.log)
    })
    
    it('should return authentication error', function (done) {
      chai.request(app)
        .post('/products')
        .send(product)
        .end(function (err, res) {
          if (err) done(err)
          else {
            expect(res.status).to.equal(401)
            expect(res.body.message).to.include('Fail authentication')
            done()
          }
        })
    })

    

    it("it should return no item availabe", function (done) {
      chai.request(app)
        .get('/products')
        .send(product)
        .end(function (err, res) {
          if (err) done(err)
          else {
            
            expect(res.status).to.equal(204)
            done()
          }
        })
    })


    it('should return error empty image', function (done) {
      chai.request(app)
        .post('/products')
        .set('token', token)
        .send(product)
        .end(function (err, res) {
          if (err) done(err)
          else {

            expect(res.status).to.equal(400)
            expect(res.body.message).to.include('Item must have an image')
            done()
          }
        })
    })

    it('should return error no name for item', function (done) {
      product.itemName = ''
      chai.request(app)
        .post('/products')
        .set('token', token)
        .send(product)
        .end(function (err, res) {
          if (err) done(err)
          else {
            expect(res.status).to.equal(400)
            expect(res.body.message).to.include('Item must have a name')
            done()
          }
        })
    })

    it('should return error no type', function (done) {
      product.itemType = ''
      chai.request(app)
        .post('/products')
        .set('token', token)
        .send(product)
        .end(function (err, res) {
          if (err) done(err)
          else {
            expect(res.status).to.equal(400)
            expect(res.body.message).to.include('Item must have a type')
            done()
          }
        })
    })

    it('should return error no price', function (done) {
      product.price = ''
      chai.request(app)
        .post('/products')
        .set('token', token)
        .send(product)
        .end(function (err, res) {
          if (err) done(err)
          else {
            expect(res.status).to.equal(400)
            expect(res.body.message).to.include('Item must have a price')
            done()
          }
        })
    })

    it('should return error no description', function (done) {
      product.description = ''
      chai.request(app)
        .post('/products')
        .set('token', token)
        .send(product)
        .end(function (err, res) {
          if (err) done(err)
          else {
            expect(res.status).to.equal(400)
            expect(res.body.message).to.include('Item must have a description')
            done()
          }
        })
    })
  })
})
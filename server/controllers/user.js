const User = require('../models/user')
const Product = require('../models/product')
const { checkPassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt.js')

class UserController {
  static register(req, res, next) {
    const { username, password, email, role } = req.body
    console.log(req.body)
    let getRole = role ? role : 'user'
    User
      .create({
        username,
        password,
        email,
        role: getRole
      })
      .then(newUser => {
        res.status(201).json(newUser)
      })
      .catch(next)
  }

  static login(req, res, next) {

    const { email, password } = req.body

    User
      .findOne({ email })
      .then(user => {
        if (user && checkPassword(password, user.password)) {
          const payload = {
            _id: user._id,
            email: user.email,
            role: user.role
          }
          const token = generateToken(payload)
          res.status(200).json({ token, username: user.username, role: user.role })
        } else if (user) {
          next({status: 404, message: 'Invalid Password' })
        } else {
          next({ status:404, message: 'User does not exist' })
        }
      })
      .catch(next)

  }
  static addToCart(req, res, next) {
    let userData

    User
      .findOne({
        _id: req.loggedUser._id
      })
      .then(user => {
        userData = user
        return Product.findOne({
          _id: req.params.id
        })
      })
      .then(product => {
        console.log(product)
        if (product.qty >= 1) {
          userData.cart.push(product._id)
          console.log(userData)
          return User.update({
            _id: userData._id
          }, {
            cart: userData.cart
          })
        } else {
          next({ status: 204, message: 'Item is not available right now! Sorry!' })
        }
      })
      .then(_ => {
        res.status(200).json({ message: 'Item added to cart' })
      })
      .catch(next)
  }

  static getCart(req, res, next) {
    User
      .findOne({ _id: req.loggedUser._id })
      .populate('cart')
      .then(({ cart }) => {
        res.status(200).json(cart)
      })
      .catch(next)
  }

  static removeCart(req, res, next) {
    let userData
    console.log(req.loggedUser)
    User
      .findOne({
        _id: req.loggedUser._id
      })
      .then(user => {
        console.log(user)
        const promises = []
        user.cart.forEach(el => {
          promises.push(Product.findOne({
            _id: el
          }))
        })
        userData = user
        return Promise.all(promises)
      })
      .then(products => {
        console.log(products)
        const promises = []
        products.forEach(product => {
          product.qty--
          promises.push(Product.update({
            _id: product._id
          }, {
            qty: product.qty
          }))
        })
        return Promise.all(promises)
      })
      .then(_ => {
        return User.update({
          _id: userData._id
        }, {
          cart: []
        })
      })
      .then(_ => {
        res.status(200).json({ message: 'Items in cart is deleted' })
      })
      .catch(next)
  }
}

module.exports = UserController
const router = require('express').Router()
const UserController = require('../controllers/user')
const authenticate = require('../middlewares/authentication')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.patch('/cart/:id', authenticate, UserController.addToCart)
router.get('/cart', authenticate, UserController.getCart)
router.delete('/cart', authenticate, UserController.removeCart)

module.exports = router
const router = require('express').Router()
const UserRoute = require('./user')
const ProductRoute = require('./product')

router.use('/users', UserRoute)
router.use('/products', ProductRoute)

module.exports = router
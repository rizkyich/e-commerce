const router = require('express').Router()
const UserRoute = require('./user')

router.use('/users', UserRoute)

module.exports = router
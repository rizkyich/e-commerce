const router = require('express').Router()

const ProductController = require('../controllers/product')
const authenticate = require('../middlewares/authentication')
const authorizeAdmin = require('../middlewares/authorizeAdmin')


router.get('/', ProductController.getAll)
router.get('/itemType/:itemType', ProductController.getItemType)
router.post('/', authenticate, authorizeAdmin, ProductController.registerProduct)
router.put('/:id', authenticate, authorizeAdmin, ProductController.updateItem)
router.delete('/:id', authenticate, authorizeAdmin, ProductController.remove)

module.exports = router
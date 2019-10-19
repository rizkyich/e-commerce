const router = require('express').Router()
const ProductController = require('../controllers/product')
const authenticate = require('../middlewares/authentication')
const authorizeAdmin = require('../middlewares/authorizeAdmin')
const {multer, sendUploadToGCS} = require('../middlewares/images')

router.get('/', ProductController.getAll)
router.get('/itemType/:itemType', ProductController.getItemType)
router.post('/', authenticate, authorizeAdmin, multer.single('image'), sendUploadToGCS, ProductController.registerProduct)
router.put('/:id', authenticate, authorizeAdmin, multer.single('image'), sendUploadToGCS, ProductController.updateItem)
router.delete('/:id', authenticate, authorizeAdmin, ProductController.remove)

module.exports = router
const Product = require('../models/product')
const { Storage } = require('@google-cloud/storage')

const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  keyFilename: process.env.GOOGLE_CLOUD_KEYFILE
})

class ProductController {
  static getAll(req, res, next) {
    console.log('masuk')
    Product
      .find()
      .then(items => {
        if (!items[0]) res.status(204).json({ message: 'items not available' })
        else res.status(200).json(items)
      })
      .catch(next)
  }

  static getItemType(req, res, next) {
    const { itemType } = req.params

    Product
      .find({ itemType })
      .sort({ updatedAt: -1 })
      .then(items => {
        if (!items[0]) res.status(204).json({ message: 'items not available' })
        res.status(200).json(items)
      })
      .catch(next)
  }

  static registerProduct(req, res, next) {
    const { itemName, description, price, qty, itemType } = req.body
    console.log(req.body)
    let image = null
    if (req.file) {
      image = req.file.cloudStoragePublicUrl
    }
    console.log(image)
    Product
      .create({ itemName, description, price, qty, itemType, image })
      .then(item => {
        res.status(201).json(item)
      })
      .catch(next)
  }

  static updateItem(req, res, next) {
    const { itemName, description, price, qty, itemType } = req.body
    const _id = req.params.id

    Product
      .findByIdAndUpdate(_id, {
        itemName, description, price, qty, itemType
      })
      .then(item => {
        res.status(200).json(item)
      })
  }

  static remove(req, res, next) {
    const _id = req.params.id

    Product
      .findByIdAndDelete(_id)
      .then(item => {
        res.status(200).json(item)
      })
      .catch(next)
  }

}

module.exports = ProductController
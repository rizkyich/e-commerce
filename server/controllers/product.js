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
      .sort({ createdAt: 'desc' })
      .then(items => {
        if (!items[0]) res.status(204).json({ message: 'items not available' })
        res.status(200).json(items)
      })
      .catch(next)
  }

  static registerProduct(req, res, next) {
    const { itemName, description, price, qty, itemType } = req.body

    let image = null
    if (req.file) {
      image = req.file.cloudStoragePublicUrl
    }

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

    let image = null
    if (req.file) {
      image = req.file.cloudStoragePublicUrl
    }
    Product.findById({
      _id
    })
      .then(product => {
        if (!image) {
          image = product.image
        } else {
          let filename = product.image.replace(/(https:\/\/storage.googleapis.com\/footrauma-images\/)/, '')
          storage.bucket(process.env.GOOGLE_CLOUD_BUCKET)
            .file(filename).delete()
        }
        return Product.update({
          _id: req.params.id
        }, {
          itemName, description, price, qty, itemType, image
        })
      })
      .then(_ => {
        res.status(200).json({ message: "Succefully updated" })
      })
      .catch(next)
  }

  static remove(req, res, next) {
    const _id = req.params.id
    console.log('ini')
    Product
      .findByIdAndDelete(_id)
      .then(item => {
        console.log(item)
        console.log('itu')
        let filename = item.image.replace(/(https:\/\/storage.googleapis.com\/footrauma-images\/)/, '')
        console.log(filename)
        storage.bucket(process.env.GOOGLE_CLOUD_BUCKET)
        .file(filename).delete()
        res.status(200).json(item)
      })
      .catch(next)
  }

}

module.exports = ProductController
const Product = require('../models/product')

class ProductController {
  static getAll(req, res, next) {
    Product
      .find()
      .sort({ updatedAt: -1 })
      .then(items => {
        if(!items[0]) res.status(204).json({message:'items not available'})
        res.status(200).json(items)
      })
      .catch(next)
  }

  static getItemType(req, res, next) {
    const { itemType } = req.params

    Product
      .find({ itemType })
      .sort({ updatedAt: -1 })
      .then(items => {
        if(!items[0]) res.status(204).json({message:'items not available'})
        res.status(200).json(items)
      })
      .catch(next)
  }

  static registerProduct(req, res, next) {
    const { itemName, description, price, qty, itemType } = req.body

    Product
      .create({ itemName, description, price, qty, itemType })
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
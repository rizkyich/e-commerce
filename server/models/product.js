const { Schema, model } = require('mongoose')

let productSchema = new Schema({
  itemName: {
    type: String,
    required: [true, 'Item must have a name']
  },
  description: {
    type: String,
    required: [true, 'Item must have a description'],
  },
  price: {
    type: Number,
    required: [true, 'Item must have a price']
  },
  qty: {
    type: Number,
    default: 1,
    min: [1, 'Item must have a quantity']
  },
  image: {
    type: String,
    required: [true, 'Item must have an image']
  },
  itemType: {
    type: String,
    enum: ['Jacket', 'Sneakers', 'Pants'],
    required: [true, 'Item must have a type']
  }
}, { timestamps: true })

const Product = model('Product', productSchema)
module.exports = Product
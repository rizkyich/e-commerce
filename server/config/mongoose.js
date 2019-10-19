const mongoose = require('mongoose')


mongoose.connect(`mongodb://localhost:27017/ecommerce-${process.env.NODE_ENV}`, { useUnifiedTopology: true,  useFindAndModify: false, useNewUrlParser: true, useCreateIndexes: true })
  .then(_ => console.log('CONNECTED TO MONGO'))
  .catch(console.log)

module.exports = mongoose
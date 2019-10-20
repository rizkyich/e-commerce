const mongoose = require('mongoose')
const url= process.env.MONGO_URI

mongoose.connect(url, { useUnifiedTopology: true,  useFindAndModify: false, useNewUrlParser: true, useCreateIndexes: true })
  .then(_ => console.log('CONNECTED TO MONGO'))
  .catch(console.log)

module.exports = mongoose
if (process.env.NODE_ENV === 'development') require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
require('./config/mongoose')


const PORT = process.env.PORT
const app = express()


// middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))


app.use('/', routes)

// error-handler
app.use(errorHandler)

app.listen(PORT, () => console.log(`SERVER LISTENING ON PORT: ${PORT}`))

module.exports = app
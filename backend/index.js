const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const { config } = require('./config/config')
const { dbConnection } = require('./libs/sequelize')

const routerApi = require('./routes')
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler
} = require('./middlewares/error.handler') // Middleware to control of errors

// Init Express
const app = express()

//Database connection
dbConnection()

// Middleware
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

// Routes
routerApi(app)
// Middleware routes errors
app.use(logErrors)
app.use(ormErrorHandler)
app.use(boomErrorHandler)
app.use(errorHandler)

// Setting
const port = config.port || 3000
app.set('port', port)

// Init Server
app.listen(app.get('port'), error => {
  if (error) {
    console.error('Error al iniciar el servidor')
  } else {
    console.log('Servidor iniciado en el puerto:' + port)
  }
})

module.exports = app

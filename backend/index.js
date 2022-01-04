const express = require('express')
const path = require('path')

require('dotenv').config()
const PORT = process.argv[2] || 8080
const cors = require('cors')
const morgan = require('morgan')
const server = express()
const cookieParser = require('cookie-parser')

server.use(cookieParser())
server.use(morgan('dev'))
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(cors())

server.listen(PORT, () => {
  console.log(`Server is run on port ${server.address().PORT} `)
})
server.on('error', error => console.log(`Error en servidor ${error}`))

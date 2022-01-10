const { Sequelize } = require('sequelize')
const { config } = require('../config/config')
const setupModels = require('../db/models')

// const USER = encodeURIComponent(config.dbUser)
// const PASSWORD = encodeURIComponent(config.dbPassword)
// const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`

// const sequelize = new Sequelize(URI, {
//   dialect: 'postgres',
//   logging: true
// })

const database = config.dbName
const dbUser = config.dbUser
const dbPassword = config.dbPassword

const sequelize = new Sequelize(database, dbUser, dbPassword ,{
  host: config.dbHost,
  dialect: 'mysql',
  port: config.dbPort
})

//Setup and Init Models
setupModels(sequelize)

//Synchronization, create table with schema , it is not the better form. We must make migrations
sequelize.sync({ alter: true })

const dbConnection = async() => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

// module.exports = sequelize
module.exports = dbConnection

const { Sequelize } = require('sequelize')
const { config } = require('../config/config')
const setupModels = require('../db/models')

const database = config.dbName
const dbUser = config.dbUser
const dbPassword = config.dbPassword

const sequelize = new Sequelize(database, dbUser, dbPassword ,{
  host: config.dbHost,
  dialect: 'mysql',
  port: config.dbPort
})

//Setup and Init Models

try {
  setupModels(sequelize)

} catch(error) {
  console.error('Error in setupModels,', error)
}

//Synchronization, create table with schema , it is not the better form. We must make migrations
// sequelize.sync({ force: true })
// sequelize.sync({ alter: true })
sequelize.sync()

const dbConnection = async() => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

module.exports = dbConnection

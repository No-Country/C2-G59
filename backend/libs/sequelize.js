const { Sequelize } = require('sequelize')
const { config } = require('../config/config')
const setupModels = require('../db/models')

const USER = encodeURIComponent(config.dbUser)
const PASSWORD = encodeURIComponent(config.dbPassword)
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: true
})

//Setup and Init Models
setupModels(sequelize)

//Synchronization, create table with schema , it is not the better form. We must make migrations
// sequelize.sync()

module.exports = sequelize

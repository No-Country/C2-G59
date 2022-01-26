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

const dbConnection = async() => {
  //Setup and Init Models
  try {
    setupModels(sequelize)
  } catch(error) {
    console.error('Error in setupModels')
  }

  //Synchronization, create table with schema , it is not the better form. We must make migrations
  sequelize.sync().catch( (error) => console.log(error))

}

module.exports = {
  dbConnection,
  sequelize
};

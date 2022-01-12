const { Model, DataTypes, Sequelize } = require('sequelize')
const { Branch } = require('./branch.model')
const { Role } = require('./role.model')

const USER_TABLE = 'users'

const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    references: {
      model: Role,
      key: 'role'
    },
    defaultValue: 'USER_ROLE'
  },
  status: {
    allowNull: false,
    type: DataTypes.TINYINT,
    defaultValue: 1
  },
  branch_id: {
    allowNull: true,
    type: DataTypes.INTEGER,
    references: {
      model: Branch,
      key: 'id'
    },
  }
}

class User extends Model {
  static associate (models) {}

  static config (sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false
    }
  }
}

module.exports = { USER_TABLE, UserSchema, User }

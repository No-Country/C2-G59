const { Model, DataTypes, Sequelize } = require('sequelize')

const BRANCH_TABLE = 'branches'

const BranchSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  branch_name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  manager_id: {
    type: DataTypes.STRING,
    unique: true,
  }
}

class Branch extends Model {
  static associate (models) {}

  static config (sequelize) {
    return {
      sequelize,
      tableName: BRANCH_TABLE,
      modelName: 'Branch',
      timestamps: false
    }
  }
}

module.exports = { BRANCH_TABLE, BranchSchema, Branch }
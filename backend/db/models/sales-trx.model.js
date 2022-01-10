const { Model, DataTypes, Sequelize } = require('sequelize')

const SALE_TRX_TABLE = 'sale_trx'

const SaleTransactionSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  cost: {
    allowNull: false,
    type: DataTypes.NUMBER,
  },
  count: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
}

class SaleTransaction extends Model {
  static associate (models) {}

  static config (sequelize) {
    return {
      sequelize,
      tableName: SALE_TRX_TABLE,
      modelName: 'SaleTransaction',
      timestamps: false
    }
  }
}

module.exports = { SALE_TRX_TABLE, SaleTransactionSchema, SaleTransaction }
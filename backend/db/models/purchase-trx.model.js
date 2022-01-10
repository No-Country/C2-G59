const { Model, DataTypes, Sequelize } = require('sequelize')

const PURCHASE_TRX_TABLE = 'purchase_trx'

const PurchaseTransactionSchema = {
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

class PurchaseTransaction extends Model {
  static associate (models) {}

  static config (sequelize) {
    return {
      sequelize,
      tableName: PURCHASE_TRX_TABLE,
      modelName: 'PurchaseTransaction',
      timestamps: false
    }
  }
}

module.exports = { PURCHASE_TRX_TABLE, PurchaseTransactionSchema, PurchaseTransaction }
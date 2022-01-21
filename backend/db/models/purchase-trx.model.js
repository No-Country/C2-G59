const { Model, DataTypes } = require('sequelize')
const { Product } = require('./product.model')
const { PurchaseOrder } = require('./purchase-order.model')

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
    type: DataTypes.DECIMAL(13, 2),
  },
  count: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  product_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Product,
      key: 'id'
    },
  },
  purchase_order_id: {
    type: DataTypes.INTEGER,
    references: {
      model: PurchaseOrder,
      key: 'id'
    },
  }
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
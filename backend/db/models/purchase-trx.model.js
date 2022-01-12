const { Model, DataTypes, Sequelize } = require('sequelize')
const {Product} = require('./product.model')
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
  product_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Product,
      key: 'id'
    },
  }
}

//purchase-order   poduct id

// product_id: {
//   type: DataTypes.INTEGER,
//   references: {
//     model: Product,
//     key: 'id'
//   },
// }
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
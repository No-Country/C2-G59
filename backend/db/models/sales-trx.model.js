const { Model, DataTypes } = require('sequelize')
const { Product } = require('./product.model')
const { RetailSale } = require('./sales.model')

const SALE_TRX_TABLE = 'sale_trx'

const SaleTransactionSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  price: {
    allowNull: false,
    type: DataTypes.DECIMAL(13, 2),
  },
  count: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  retail_sale_id: {
    type: DataTypes.INTEGER,
    references: {
      model: RetailSale,
      key: 'id'
    },
  },
  product_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Product,
      key: 'id'
    },
  }
}

class SaleTransaction extends Model {
  static associate(models) { }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SALE_TRX_TABLE,
      modelName: 'SaleTransaction',
      timestamps: false
    }
  }
}

module.exports = { SALE_TRX_TABLE, SaleTransactionSchema, SaleTransaction }
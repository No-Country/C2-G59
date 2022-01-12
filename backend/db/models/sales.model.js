const { Model, DataTypes, Sequelize } = require('sequelize')
const {Product} = require('./product.model')
const RETAIL_SALES_TABLE = 'retail_sales'

const RetailSaleSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  sale_date: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  pay_date: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  payment_status: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  product_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Product,
      key: 'id'
    },
  }
}

class RetailSale extends Model {
  static associate(models) { }

  static config(sequelize) {
    return {
      sequelize,
      tableName: RETAIL_SALES_TABLE,
      modelName: 'RetailSale',
      timestamps: false
    }
  }
}

module.exports = { RETAIL_SALES_TABLE, RetailSaleSchema, RetailSale }
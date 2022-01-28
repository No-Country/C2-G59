const { Model, DataTypes } = require('sequelize')
const { Branch } = require('./branch.model')
const RETAIL_SALES_TABLE = 'retail_sales'

const RetailSaleSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  amount: {
    allowNull: false,
    type: DataTypes.DECIMAL(13,2),
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
  branch_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Branch,
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
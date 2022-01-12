const { Model, DataTypes, Sequelize } = require('sequelize')

const PURCHASE_ORDERS_TABLE = 'purchase_orders'

const PurchaseOrderSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  purchase_date: {
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

class PurchaseOrder extends Model {
  static associate(models) { }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PURCHASE_ORDERS_TABLE,
      modelName: 'PurchaseOrder',
      timestamps: false
    }
  }
}

module.exports = { PURCHASE_ORDERS_TABLE, PurchaseOrderSchema, PurchaseOrder }
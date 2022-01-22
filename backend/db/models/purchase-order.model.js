const { Model, DataTypes } = require('sequelize')
const { Branch } = require('./branch.model')
const { BranchSupplier } = require('./branch-supplier.model')

const PURCHASE_ORDERS_TABLE = 'purchase_orders'

const PurchaseOrderSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  invoice: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  amount: {
    allowNull: false,
    type: DataTypes.DECIMAL(13,2),
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
  branch_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Branch,
      key: 'id'
    },
  },
  supplier_id: {
    type: DataTypes.INTEGER,
    references: {
      model: BranchSupplier,
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
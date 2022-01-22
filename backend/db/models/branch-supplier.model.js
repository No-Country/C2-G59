const { Model, DataTypes, Sequelize } = require('sequelize')

const BRANCH_SUPPLIER_TABLE = 'branch_suppliers'

const BranchSupplierSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  supplier_name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
}

class BranchSupplier extends Model {
  static associate (models) {}

  static config (sequelize) {
    return {
      sequelize,
      tableName: BRANCH_SUPPLIER_TABLE,
      modelName: 'BranchSupplier',
      timestamps: false
    }
  }
}

module.exports = { BRANCH_SUPPLIER_TABLE, BranchSupplierSchema, BranchSupplier }
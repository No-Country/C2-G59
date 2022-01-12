const { Model, DataTypes } = require('sequelize')
const { Product } = require('./product.model')
const { Category } = require('./category.model')


const CATEGORY_TREE_TABLE = 'category_tree'

const CategoryTreeSchema = {
  category_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Category,
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

class CategoryTree extends Model {
  static associate (models) {}

  static config (sequelize) {
    return {
      sequelize,
      tableName: CATEGORY_TREE_TABLE,
      modelName: 'CategoryTree',
      timestamps: false
    }
  }
}

module.exports = { CATEGORY_TREE_TABLE, CategoryTreeSchema, CategoryTree }
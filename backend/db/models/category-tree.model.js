const { Model, Sequelize } = require('sequelize')

const CATEGORY_TREE_TABLE = 'category_tree'

const CategoryTreeSchema = {}

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
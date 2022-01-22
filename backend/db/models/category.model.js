const { Model, DataTypes, Sequelize } = require('sequelize')

const CATEGORY_TABLE = 'categories'

const CategorySchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  category_name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
}

class Category extends Model {
  static associate (models) {}

  static config (sequelize) {
    return {
      sequelize,
      tableName: CATEGORY_TABLE,
      modelName: 'Category',
      timestamps: false
    }
  }
}

module.exports = { CATEGORY_TABLE, CategorySchema, Category }
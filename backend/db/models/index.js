const { User, UserSchema } = require('./user.model')
const { Branch, BranchSchema } = require('./branch.model')
const { CategoryTree, CategoryTreeSchema} = require('./category-tree.model')
const { Category, CategorySchema } = require('./category.model')
const { BranchSupplier, BranchSupplierSchema } = require('./branch-supplier.model')
const { Product, ProductSchema } = require('./product.model')
const { PurchaseOrder, PurchaseOrderSchema } = require('./purchase-order.model')
const { PurchaseTransaction, PurchaseTransactionSchema } = require('./purchase-trx.model')
const { SaleTransaction, SaleTransactionSchema } = require('./sales-trx.model')
const { RetailSale, RetailSaleSchema } = require('./sales.model')


function setupModels(sequelize) {

  //Users table
  // User.init(UserSchema, User.config(sequelize))
  // User.associate(sequelize.models)

  //Branches table
  // Branch.init(BranchSchema, Branch.config(sequelize))
  // Branch.associate(sequelize.models)

  // TODO: Inicializar los modelos
  CategoryTree.init(CategoryTreeSchema,CategoryTree.config(sequelize))
  CategoryTree.associate(sequelize.models)

  Category.init(CategorySchema, Category.config(sequelize))
  Category.associate(sequelize.models)

  BranchSupplier.init(BranchSupplierSchema, BranchSupplier.config(sequelize))
  BranchSupplier.associate(sequelize.models)

  Product.init(ProductSchema, Product.config(sequelize))
  Product.associate(sequelize.models)

  PurchaseOrder.init(PurchaseOrderSchema, PurchaseOrder.config(sequelize))
  PurchaseOrder.associate(sequelize.models)

  PurchaseTransaction.init(PurchaseTransactionSchema, PurchaseTransaction.config(sequelize))
  PurchaseTransaction.associate(sequelize.models)

  SaleTransaction.init(SaleTransactionSchema, SaleTransaction.config(sequelize))
  SaleTransaction.associate(sequelize.models)

  RetailSale.init(RetailSaleSchema, RetailSale.config(sequelize))
  RetailSale.associate(sequelize.models)


  // Associations
  // User.belongsTo(Branch)
  User.hasOne(Branch, { foreignKey: 'manager_id' })
  Branch.hasMany(User, {
    foreignKey: 'branch_id',
    constraints: false
  }) // Crea branch_id en Users

  // TODO: Asociar las claves foraneas de todas las tablas
  

}

module.exports = setupModels

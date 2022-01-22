const { User, UserSchema } = require('./user.model');
const { Role, RoleSchema } = require('./role.model');
const { Branch, BranchSchema } = require('./branch.model');
const {
  BranchSupplier,
  BranchSupplierSchema,
} = require('./branch-supplier.model');
const { CategoryTree, CategoryTreeSchema } = require('./category-tree.model');
const { Category, CategorySchema } = require('./category.model');
const { Product, ProductSchema } = require('./product.model');
const {
  PurchaseOrder,
  PurchaseOrderSchema,
} = require('./purchase-order.model');
const {
  PurchaseTransaction,
  PurchaseTransactionSchema,
} = require('./purchase-trx.model');
const { RetailSale, RetailSaleSchema } = require('./sales.model');
const { SaleTransaction, SaleTransactionSchema } = require('./sales-trx.model');



function setupModels(sequelize) {
  // Branches table
  Branch.init(BranchSchema, Branch.config(sequelize));
  Branch.associate(sequelize.models);

  // Roles table
  Role.init(RoleSchema, Role.config(sequelize));
  Role.associate(sequelize.models);

  // Users table
  User.init(UserSchema, User.config(sequelize));
  User.associate(sequelize.models);

  Product.init(ProductSchema, Product.config(sequelize));
  Product.associate(sequelize.models);

  Category.init(CategorySchema, Category.config(sequelize));
  Category.associate(sequelize.models);

  CategoryTree.init(CategoryTreeSchema, CategoryTree.config(sequelize));
  CategoryTree.associate(sequelize.models);

  BranchSupplier.init(BranchSupplierSchema, BranchSupplier.config(sequelize));
  BranchSupplier.associate(sequelize.models);

  PurchaseOrder.init(PurchaseOrderSchema, PurchaseOrder.config(sequelize));
  PurchaseOrder.associate(sequelize.models);

  RetailSale.init(RetailSaleSchema, RetailSale.config(sequelize));
  RetailSale.associate(sequelize.models);

  PurchaseTransaction.init(
    PurchaseTransactionSchema,
    PurchaseTransaction.config(sequelize)
  );
  PurchaseTransaction.associate(sequelize.models);

  SaleTransaction.init(
    SaleTransactionSchema,
    SaleTransaction.config(sequelize)
  )
  SaleTransaction.associate(sequelize.models)

}

module.exports = setupModels;

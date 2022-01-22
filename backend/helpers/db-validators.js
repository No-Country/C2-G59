const { Branch } = require('../db/models/branch.model');
const { Role } = require('../db/models/role.model');
const { User } = require('../db/models/user.model');
const { Product } = require('../db/models/product.model');
const { Category } = require('../db/models/category.model');
const { PurchaseOrder } = require('../db/models/purchase-order.model')
const { PurchaseTransaction } = require('../db/models/purchase-trx.model')
const { RetailSale } = require('../db/models/sales.model')
const { SaleTransaction } = require('../db/models/sales-trx.model')
const { BranchSupplier } = require('../db/models/branch-supplier.model')

// Validate if exist a User with this email
const emailExist = async (email = '') => {
  const emailExist = await User.findOne({ where: { email } });
  if (emailExist) {
    throw new Error(`The email '${email}' already exist`);
  }
};

const isRoleValid = async (role = 'USER_ROLE') => {
  const roleExist = await Role.findOne({ where: { role } });
  if (!roleExist) {
    throw new Error(`The role '${role}' doesn't exist`);
  }
};

const userExistById = async (id = '') => {
  const userExist = await User.findOne({ where: { id } });
	if (!userExist) {
    throw new Error(`The user with id '${id}' doesn't exist`);
  }
};

const branchExistById = async (id = '') => {
  const branchExist = await Branch.findOne({ where: { id } });
	if (!branchExist) {
    throw new Error(`The branch with id '${id}' doesn't exist`);
  }
};

const productExistById = async (id = '') => {
  const productExist = await Product.findOne({ where: { id } });
	if (!productExist) {
    throw new Error(`The product with id '${id}' doesn't exist`);
  }
};

const categoryExistById = async (id = '') => {
  const categoryExist = await Category.findOne({ where: { id } });
	if (!categoryExist) {
    throw new Error(`The category with id '${id}' doesn't exist`);
  }
};

const purchaseOrderExistById = async (id = '') => {
  const purchaseOrderExist = await PurchaseOrder.findOne({ where: { id } });
	if (!purchaseOrderExist) {
    throw new Error(`The purchase order with id '${id}' doesn't exist`);
  }
};

const purchaseTransactionExistById = async (id = '') => {
  const purchaseTransactionExist = await PurchaseTransaction.findOne({ where: { id } });
	if (!purchaseTransactionExist) {
    throw new Error(`The purchase transaction with id '${id}' doesn't exist`);
  }
};

const retailSaleExistById = async (id = '') => {
  const retailSaleExist = await RetailSale.findOne({ where: { id } });
	if (!retailSaleExist) {
    throw new Error(`The retail sale with id '${id}' doesn't exist`);
  }
};

const saleTransactionExistById = async (id = '') => {
  const saleTransactionExist = await SaleTransaction.findOne({ where: { id } });
	if (!saleTransactionExist) {
    throw new Error(`The sale transaction with id '${id}' doesn't exist`);
  }
};

const supplierExistById = async (id = '') => {
  const supplierExist = await BranchSupplier.findOne({ where: { id } });
  if (!supplierExist) {
    throw new Error(`The supplier with id '${id}' doesn't exist`)
  }
}

module.exports = {
  emailExist,
  isRoleValid,
	userExistById,
  branchExistById,
  productExistById,
  categoryExistById,
  purchaseOrderExistById,
  purchaseTransactionExistById,
  retailSaleExistById,
  saleTransactionExistById,
  supplierExistById
};

const { Branch } = require('../db/models/branch.model');
const { Role } = require('../db/models/role.model');
const { User } = require('../db/models/user.model');
const { Product } = require('../db/models/product.model');


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

module.exports = {
  emailExist,
  isRoleValid,
	userExistById,
  branchExistById,
  productExistById,
};

const { User, UserSchema } = require('./user.model')
const { Branch, BranchSchema } = require('./branch.model')
const { Role, RoleSchema } = require('./role.model')

function setupModels (sequelize) {

  // Branches table
  Branch.init(BranchSchema, Branch.config(sequelize))
  Branch.associate(sequelize.models)

  // Roles table
  Role.init(RoleSchema, Role.config(sequelize))
  Role.associate(sequelize.models)

  // Users table
  User.init(UserSchema, User.config(sequelize))
  User.associate(sequelize.models)

  
  // TODO: Inicializar los modelos

  // Associations
  // User.belongsTo(Branch)
  // User.hasOne(Branch, { foreignKey: 'manager_id'})
  // Branch.hasMany(User, { 
  //   foreignKey: 'branch_id',
  //   constraints: false
  // }) // Crea branch_id en Users

  // TODO: Asociar las claves foraneas de todas las tablas
  

}

module.exports = setupModels

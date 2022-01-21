// Esta response se usa para que aparezca la ayuda de VS Code con las res
const { request, response } = require('express');
const bcrypt = require('bcryptjs');

// Mis imports
const { User } = require('../db/models/user.model');
const { Branch } = require('../db/models/branch.model');

// GET
const getUsers = async (req = request, res = response) => {
 
	const users = await User.findAll({ where: { status: 1 } })
  const newUsers = []


	for (let i = 0; i < users.length; i++){
		let { id, name, email,password, role, status, branch_id } = users[i];
		let branch = branch_id !== null
                  ? await Branch.findOne({ where: { id: branch_id  } })
                  : null

    newUsers.push({ id, name, email, password, role, status, branch })
	}

  res.status(200).json( newUsers )

};

// GET
const getUserById = async (req = request, res = response) => {
	
	const { id:_id } = req.params

	const { 
    id, 
    name, 
    email,
    password, 
    role, 
    status, 
    branch_id 
  } = await User.findOne({ where: { id:_id } })
  
  let branch = branch_id !== null
                  ? await Branch.findOne({ where: { id: branch_id  } })
                  : null

  const user = { id, name, email, password, role, status, branch }

  res.status(200).json({ user })

};

// POST
const createUser = async (req = request, res = response) => {
  const { name, email, password, role, branch_id } = req.body;

  // Encriptar password
  const salt = bcrypt.genSaltSync();
  bcryptPassword = bcrypt.hashSync(password, salt);

  try {
    
    // Define and save in DB
    const user = await User.create({
      name,
      email,
      role,
      branch_id,
      password: bcryptPassword,
    });

    res.status(200).json({ user });

  } catch (error) {
    res.status(500).json({
      msg: 'Talk with the admin',
      error: error.errors[0].message,
    });
  }
};

// PUT
const updateUser = async (req = request, res = response) => {
  const { id } = req.params;
  const { id:_id, email, password, ...restUser } = req.body;
  
  if ( password ) {
      // Encriptar password
      const salt = bcrypt.genSaltSync();
      restUser.password = bcrypt.hashSync(password, salt);
  }

  // Esto regresa el user antes de cambiar los valores
  await User.update(restUser, { where: { id } }).catch((error) => {
		res.status(400).json({
			msg: 'Talk with the admin',
			error
		});
	});
  
	res.status(200).json({
		msg: 'User updated successfully'
	});

};

// DELETE
const deleteUser = async (req = request, res = response) => {
  
	const { id } = req.params;
	const statusDelete = { status: 0 };
  
  // Esto regresa el user antes de cambiar los valores
  await User.update(statusDelete, { where: { id } }).catch((error) => {
		res.status(400).json({
			msg: 'Talk with the admin',
			error
		});
	});
  
	res.status(200).json({
		msg: 'User deleted successfully'
	});
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
	updateUser,
	deleteUser,
};

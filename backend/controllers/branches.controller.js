const { request, response } = require("express")
const { Branch } = require("../db/models/branch.model")
const { User } = require("../db/models/user.model")

const getBranches = async(req = request, res = response) => {

	const branches = await Branch.findAll()
	const newBranches = []

	for (let i = 0; i < branches.length; i++){
		let { id, branch_name, manager_id } = branches[i];
		let manager = manager_id !== null
								? await User.findOne({ where: { id: manager_id  } })
								: null

		newBranches.push({ id, branch_name, manager })
	}

	res.status(200).json( newBranches )

}

const getBranchById = async(req = request, res = response) => {

	const { id:_id } = req.params

	const { 
		id, 
		branch_name, 
		manager_id 
	} = await Branch.findOne({ where: { id:_id } })
  
	let manager = manager_id !== null
								? await User.findOne({ where: { id: manager_id  } })
								: null

	res.status(200).json({ id, branch_name, manager })

}

const createBranch = async(req = request, res = response) => {

  const { name, manager_id = null } = req.body;

  try {
    // Define and save in DB
    const branch = await Branch.create({
      branch_name: name,
			manager_id
    });

    res.status(200).json({ branch });

  } catch (error) {
    res.status(500).json({
      msg: 'Talk with the admin',
      error: error.errors[0].message,
    });
  }
}

const updateBranch = async(req = request, res = response) => {
	const { id } = req.params
  const { id:_id, name, manager_id } = req.body

	try {

		// If the user send de manager_id, verify if the user exist
		if ( manager_id ) {
			const user = User.findOne({ where: { id: manager_id }})
			if(!user) {
				return res.status(400).json({
					msg: 'Invalid manager id'
				})
			}
		}

		await Branch.update({ branch_name: name, manager_id }, { where: { id } })
			.catch((error) => {
				res.status(400).json({
					msg: 'Talk with the admin',
					error
				});
			});
  
		res.status(200).json({
			msg: 'Branch updated successfully'
		});

	} catch(error) {
		console.log(error);
		res.status(500).json({
      msg: 'Talk to the admin'
		});
	}
}

const deleteBranch = async(req = request, res = response) => {

	const { id } = req.params;

	await Branch.destroy({ where: { id } }).catch((error) => {
		return res.status(400).json({
			msg: 'Talk with the admin',
			error
		});
	});

	res.status(200).json({
		msg: 'Branch deleted successfully'
	});

}


module.exports = {
	getBranches,
	getBranchById,
	createBranch,
	updateBranch,
	deleteBranch,
}
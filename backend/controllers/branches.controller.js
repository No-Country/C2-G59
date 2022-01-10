const { request, response } = require("express")

const getBranches = async(req = request, res = response) => {

  try {
		res.status(200).json({
			ok: true,
			msg: 'getBranches',
		});

	} catch(error) {
		console.log(error);
		res.status(500).json({
      msg: 'Talk to the admin'
		});
	}
}

const getBranchById = async(req = request, res = response) => {

  try {
		res.status(200).json({
			ok: true,
			msg: 'getBranchById',
		});

	} catch(error) {
		console.log(error);
		res.status(500).json({
      msg: 'Talk to the admin'
		});
	}
}

const createBranch = async(req = request, res = response) => {

  try {
		res.status(200).json({
			ok: true,
			msg: 'createBranch',
		});

	} catch(error) {
		console.log(error);
		res.status(500).json({
      msg: 'Talk to the admin'
		});
	}
}

const updateBranch = async(req = request, res = response) => {

  try {
		res.status(200).json({
			ok: true,
			msg: 'updateBranch',
		});

	} catch(error) {
		console.log(error);
		res.status(500).json({
      msg: 'Talk to the admin'
		});
	}
}

const deleteBranch = async(req = request, res = response) => {

  try {
		res.status(200).json({
			ok: true,
			msg: 'deleteBranch',
		});

	} catch(error) {
		console.log(error);
		res.status(500).json({
      msg: 'Talk to the admin'
		});
	}
}


module.exports = {
	getBranches,
	getBranchById,
	createBranch,
	updateBranch,
	deleteBranch,
}
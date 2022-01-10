const { request, response } = require("express")

const getCategories = async(req = request, res = response) => {

  try {
		res.status(200).json({
			ok: true,
			msg: 'getCategories',
		});

	} catch(error) {
		console.log(error);
		res.status(500).json({
      msg: 'Talk to the admin'
		});
	}
}

const getCategoryById = async(req = request, res = response) => {

  try {
		res.status(200).json({
			ok: true,
			msg: 'getCategoryById',
		});

	} catch(error) {
		console.log(error);
		res.status(500).json({
      msg: 'Talk to the admin'
		});
	}
}

const createCategory = async(req = request, res = response) => {

  try {
		res.status(200).json({
			ok: true,
			msg: 'createCategory',
		});

	} catch(error) {
		console.log(error);
		res.status(500).json({
      msg: 'Talk to the admin'
		});
	}
}

const updateCategory = async(req = request, res = response) => {

  try {
		res.status(200).json({
			ok: true,
			msg: 'updateCategory',
		});

	} catch(error) {
		console.log(error);
		res.status(500).json({
      msg: 'Talk to the admin'
		});
	}
}

const deleteCategory = async(req = request, res = response) => {

  try {
		res.status(200).json({
			ok: true,
			msg: 'deleteCategory',
		});

	} catch(error) {
		console.log(error);
		res.status(500).json({
      msg: 'Talk to the admin'
		});
	}
}


module.exports = {
	getCategories,
	getCategoryById,
	createCategory,
	updateCategory,
	deleteCategory,
}
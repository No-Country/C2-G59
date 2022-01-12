const { request, response } = require("express")

const getProducts = async(req = request, res = response) => {

  try {
		res.status(200).json({
			ok: true,
			msg: 'getProducts',
		});

	} catch(error) {
		console.log(error);
		res.status(500).json({
      msg: 'Talk to the admin'
		});
	}
}

const getProductById = async(req = request, res = response) => {

  try {
		res.status(200).json({
			ok: true,
			msg: 'getProductById',
		});

	} catch(error) {
		console.log(error);
		res.status(500).json({
      msg: 'Talk to the admin'
		});
	}
}

const createProduct = async(req = request, res = response) => {

  try {
		res.status(200).json({
			ok: true,
			msg: 'createProduct',
		});

	} catch(error) {
		console.log(error);
		res.status(500).json({
      msg: 'Talk to the admin'
		});
	}
}

const updateProduct = async(req = request, res = response) => {

  try {
		res.status(200).json({
			ok: true,
			msg: 'updateProduct',
		});

	} catch(error) {
		console.log(error);
		res.status(500).json({
      msg: 'Talk to the admin'
		});
	}
}

const deleteProduct = async(req = request, res = response) => {

  try {
		res.status(200).json({
			ok: true,
			msg: 'deleteProduct',
		});

	} catch(error) {
		console.log(error);
		res.status(500).json({
      msg: 'Talk to the admin'
		});
	}
}


module.exports = {
	getProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
}
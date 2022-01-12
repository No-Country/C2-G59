const { request, response } = require("express")

const getSuppliers = async(req = request, res = response) => {

  try {
		res.status(200).json({
			ok: true,
			msg: 'getSuppliers',
		});

	} catch(error) {
		console.log(error);
		res.status(500).json({
      msg: 'Talk to the admin'
		});
	}
}

const getSupplierById = async(req = request, res = response) => {

  try {
		res.status(200).json({
			ok: true,
			msg: 'getSupplierById',
		});

	} catch(error) {
		console.log(error);
		res.status(500).json({
      msg: 'Talk to the admin'
		});
	}
}

const createSupplier = async(req = request, res = response) => {

  try {
		res.status(200).json({
			ok: true,
			msg: 'createSupplier',
		});

	} catch(error) {
		console.log(error);
		res.status(500).json({
      msg: 'Talk to the admin'
		});
	}
}

const updateSupplier = async(req = request, res = response) => {

  try {
		res.status(200).json({
			ok: true,
			msg: 'updateSupplier',
		});

	} catch(error) {
		console.log(error);
		res.status(500).json({
      msg: 'Talk to the admin'
		});
	}
}

const deleteSupplier = async(req = request, res = response) => {

  try {
		res.status(200).json({
			ok: true,
			msg: 'deleteSupplier',
		});

	} catch(error) {
		console.log(error);
		res.status(500).json({
      msg: 'Talk to the admin'
		});
	}
}


module.exports = {
	getSuppliers,
	getSupplierById,
	createSupplier,
	updateSupplier,
	deleteSupplier,
}
const { request, response } = require("express")
const { BranchSupplier } = require('../db/models/branch-supplier.model');

const getSuppliers = async(req = request, res = response) => {

	try {
		const supplier = await BranchSupplier.findAll();
		res.status(200).json({ supplier });
	  } catch (error) {
		console.log(error);
		res.status(500).json({
		  msg: 'Talk to the admin',
		});
	  }
}

const getSupplierById = async(req = request, res = response) => {

	const { id } = req.params;

	try {
	  const supplier = await BranchSupplier.findOne({ where: { id } });
	  res.status(200).json({ supplier });
	} catch (error) {
	  console.log(error);
	  res.status(500).json({
		msg: 'Talk to the admin',
	  });
	}
}

const createSupplier = async(req = request, res = response) => {

	const {
		supplier_name
	  } = req.body;
	
	  const supplier = await BranchSupplier.create({
		supplier_name
	  });
	
	  res.status(200).json({ supplier });
}

const updateSupplier = async(req = request, res = response) => {

	const { id } = req.params;

	await BranchSupplier.update(req.body, { where: { id } })
		  .catch( (error) => {
			  res.status(400).json({
				  msg: 'Talk with the admin',
				  error,
			  });
		  });
  
	res.status(200).json({
	  msg: 'Supplier updated successfully',
	});
}

const deleteSupplier = async(req = request, res = response) => {

	const { id } = req.params;

	await BranchSupplier.destroy({ where: { id } }).catch((error) => {
		  return res.status(400).json({
			  msg: 'Talk with the admin',
			  error
		  });
	  });
  
	  res.status(200).json({
		  msg: 'Supplier deleted successfully'
	  });
}


module.exports = {
	getSuppliers,
	getSupplierById,
	createSupplier,
	updateSupplier,
	deleteSupplier,
}
const { request, response } = require('express');
const { Product } = require('../db/models/product.model');

const getProducts = async (req = request, res = response) => {
  try {
    const products = await Product.findAll();
    res.status(200).json({ products });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Talk to the admin',
    });
  }
};

const getProductById = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const product = await Product.findOne({ where: { id } });
    res.status(200).json({ product });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Talk to the admin',
    });
  }
};

const createProduct = async (req = request, res = response) => {
  const {
    product_name,
    description = '',
    price = 0,
    category
  } = req.body;

  const product = await Product.create({
    product_name,
    description,
    price,
    category
  });

  res.status(200).json({ product });
};

const updateProduct = async (req = request, res = response) => {
  const { id } = req.params;

  await Product.update(req.body, { where: { id } })
		.catch( (error) => {
			res.status(400).json({
				msg: 'Talk with the admin',
				error,
			});
		});

  res.status(200).json({
    msg: 'Product updated successfully',
  });
};

const deleteProduct = async (req = request, res = response) => {

	const { id } = req.params;

  await Product.destroy({ where: { id } }).catch((error) => {
		return res.status(400).json({
			msg: 'Talk with the admin',
			error
		});
	});

	res.status(200).json({
		msg: 'Product deleted successfully'
	});
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};

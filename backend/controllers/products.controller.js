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
    price = 0,
    stock = 0,
    ...restProduct
  } = req.body;

  const product = await Product.create({
    price,
    stock,
    ...restProduct
  }).catch((error) => {
    return res.status(500).json({ error });
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

const updateProductStock = async (req = request, res = response) => {
  const { id, count } = req.params;
  const { action = 'increment' } = req.query; // increment or decrement
  const { stock, product_name } = await Product.findOne({ where: { id }});
  const countNumber = Number(count);

  if ( action !== 'increment' && action !== 'decrement') {
    return res.status(400).json({
      error: 'action must be \'increment\' or \'decrement\''
    });
  }

  if ( stock - countNumber < 0 && action === 'decrement') {
    return res.status(400).json({
      error: 'Not enought items to sell'
    });
  }

  let newStock = action === 'increment' 
                ? stock + countNumber 
                : stock - countNumber;

  newStock = newStock < 0 ? 0 : newStock;
  
  await Product.update({ stock: newStock }, { where: { id } })
		.catch( (error) => {
			res.status(400).json({
				msg: 'Talk with the admin',
				error,
			});
		});

  res.status(200).json({
    msg: `New stock for ${product_name}: ${ newStock }`,
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
  updateProductStock,
  deleteProduct,
};

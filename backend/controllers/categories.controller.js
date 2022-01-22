const { request, response } = require('express')
const { Category } = require('../db/models/category.model')

const getCategories = async (req = request, res = response) => {
  try {
    const category = await Category.findAll()
    res.status(200).json({ category })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Talk to the admin'
    })
  }
}

const getCategoryById = async (req = request, res = response) => {
  const { id } = req.params

  try {
    const category = await Category.findOne({ where: { id } })
    res.status(200).json({ category })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Talk to the admin'
    })
  }
}

const createCategory = async (req = request, res = response) => {
  const { category_name } = req.body

  const category = await Category.create({
    category_name
  })

  res.status(200).json({ category })
}

const updateCategory = async (req = request, res = response) => {
	const { id } = req.params;

	await Category.update(req.body, { where: { id } })
		  .catch( (error) => {
			  res.status(400).json({
				  msg: 'Talk with the admin',
				  error,
			  });
		  });
  
	res.status(200).json({
	  msg: 'Category updated successfully',
	});
}

const deleteCategory = async (req = request, res = response) => {
	const { id } = req.params;

	await Category.destroy({ where: { id } }).catch((error) => {
		  return res.status(400).json({
			  msg: 'Talk with the admin',
			  error
		  });
	  });
  
	  res.status(200).json({
		  msg: 'Category deleted successfully'
	  });
}

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
}

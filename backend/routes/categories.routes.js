const { Router } = require('express');
const { check } = require('express-validator');


// Middlewares
const { validateInputs } = require('../middlewares/validate-inputs');

// Helpers
const { categoryExistById } = require('../helpers/db-validators');

// Controllers
const { 
  getCategories,
	getCategoryById,
	createCategory,
	deleteCategory,
} = require('../controllers/categories.controller');

// Rutas
const router = Router();
// /api/categories

// Get all Categories [Public]
router.get('/', getCategories );

// Get a Category by id [Public]
router.get('/:id', [
    check('id').custom( categoryExistById ),
    validateInputs
], getCategoryById );

// Create a Category [Public]
router.post('/', [
    check('category_name', 'The category_name is obligatory').not().isEmpty(),
    validateInputs
], createCategory );

// Delete Category [Public]
router.delete('/:id', [
    check('id').custom( categoryExistById ),
    validateInputs
], deleteCategory );

module.exports = router;
const { Router } = require('express')
const { check } = require('express-validator')

// Middlewares
const { validateInputs } = require('../middlewares/validate-inputs')

// Helper
const { categoryExistById } = require('../helpers/db-validators');

// Controllers
const { 
    getCategories,
	getCategoryById,
	createCategory,
	updateCategory,
	deleteCategory,
} = require('../controllers/categories.controller')

// Rutas
const router = Router();
// /api/categories

// Get an Category by id [Public]
router.get('/', getCategories );

// Get an Category by id [Public]
router.get('/:id', [
    check('id').custom( categoryExistById ),
    validateInputs
], getCategoryById );

// Create Category [Public]
router.post('/', [
    check('category_name', 'The category_name is obligatory').not().isEmpty(),
    validateInputs
], createCategory );

// Update Category [Public]
router.put('/:id', [
    check('id').custom( categoryExistById ),
	check('category_name', 'The category_name is obligatory').not().isEmpty(),
    validateInputs
], updateCategory );

// Delete Category [Public]
router.delete('/:id', [
    check('id').custom( categoryExistById ),
    validateInputs
], deleteCategory );

module.exports = router;
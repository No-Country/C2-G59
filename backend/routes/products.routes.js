const { Router } = require('express')
const { check } = require('express-validator')

// Middlewares
const { validateInputs } = require('../middlewares/validate-inputs')

// Helper
const { productExistById } = require('../helpers/db-validators');

// Controllers
const { 
    getProducts,
	getProductById,
	createProduct,
	updateProduct,
    updateProductStock,
	deleteProduct
} = require('../controllers/products.controller');

// Rutas
const router = Router();
// /api/products

// Get an Products by id [Public]
router.get('/', getProducts );

// Get an Product by id [Public]
router.get('/:id', [
    check('id').custom( productExistById ),
    validateInputs
], getProductById );

// Create Product [Public]
router.post('/', [
    check('product_name', 'The product_name is obligatory').not().isEmpty(),
    validateInputs
], createProduct );

// Update Product [Public]
router.put('/:id', [
    check('id').custom( productExistById ),
    validateInputs
], updateProduct );

// Update Product stock [Public]
// /:id/stock/:count?action=decrement  or increment
router.put('/:id/stock/:count', [
    check('id').custom( productExistById ),
    validateInputs
], updateProductStock );

// Delete Product [Public]
router.delete('/:id', [
    check('id').custom( productExistById ),
    validateInputs
], deleteProduct );


module.exports = router;
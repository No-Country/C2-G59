const { Router } = require('express')

// Middlewares
const { validateInputs } = require('../middlewares/validate-inputs')

// Controllers
const { 
    getProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct
} = require('../controllers/products.controller')

// Rutas
const router = Router();
// /api/products

// router.post('/login', [
//     validateInputs
// ], authLogin );

module.exports = router;
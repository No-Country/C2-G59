const { Router } = require('express')

// Middlewares
const { validateInputs } = require('../middlewares/validate-inputs')

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

// router.post('/login', [
//     validateInputs
// ], authLogin );

module.exports = router;
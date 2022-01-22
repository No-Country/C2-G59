const { Router } = require('express')

// Middlewares
const { validateInputs } = require('../middlewares/validate-inputs')

// Controllers
const { 
    getSuppliers,
	getSupplierById,
	createSupplier,
	updateSupplier,
    deleteSupplier
} = require('../controllers/suppliers.controller')

// Rutas
const router = Router();
// /api/suppliers

// router.post('/login', [
//     validateInputs
// ], authLogin );

module.exports = router;
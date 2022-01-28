const { Router } = require('express')
const { check } = require('express-validator')

// Middlewares
const { validateInputs } = require('../middlewares/validate-inputs')

// Helper
const { supplierExistById } = require('../helpers/db-validators');

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

// Get an Supplier by id [Public]
router.get('/', getSuppliers );

// Get an Supplier by id [Public]
router.get('/:id', [
    check('id').custom( supplierExistById ),
    validateInputs
], getSupplierById );

// Create Supplier [Public]
router.post('/', [
    check('supplier_name', 'The supplier_name is obligatory').not().isEmpty(),
    validateInputs
], createSupplier);

// Update Supplier [Public]
router.put('/:id', [
    check('id').custom( supplierExistById ),
	check('supplier_name', 'The supplier_name is obligatory').not().isEmpty(),
    validateInputs
], updateSupplier );

// Delete Supplier [Public]
router.delete('/:id', [
    check('id').custom( supplierExistById ),
    validateInputs
], deleteSupplier );

module.exports = router;
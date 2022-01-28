const { Router } = require('express');
const { check } = require('express-validator');

// Middlewares
const { validateInputs } = require('../middlewares/validate-inputs');

// Helper
const {
  retailSaleExistById,
  // branchExistById,
} = require('../helpers/db-validators');

// Controllers
const {
	getRetailSale,
	getRetailSaleById,
	createRetailSale,
	deleteRetailSale,
} = require('../controllers/retail-sale.controller');

// Rutas
const router = Router();
// /api/purchase

// Get all RetailSale [Public]
router.get('/', getRetailSale);

// Get a RetailSale by id [Public]
router.get('/:id', [
	check('id').custom(retailSaleExistById),
	validateInputs
], getRetailSaleById );

// Create RetailSale [Public]
router.post('/', [
	// check('sale_date').isDate({format: 'DD-MM-YYYY'}),
	// check('pay_date').isDate(),
	check('branch_id', 'The branch_id is obligatory').not().isEmpty(),
	// check('id').custom( branchExistById ),
	check('amount', 'The amount is obligatory').not().isEmpty(),
	// TODO: Validation for array of products {id, cant, price}
    validateInputs,
], createRetailSale);

// Delete an RetailSale by id [Public]
router.delete('/:id', [
	check('id').custom(retailSaleExistById),
	validateInputs
], 	deleteRetailSale,
);

module.exports = router;

const { Router } = require('express');
const { check } = require('express-validator');

// Middlewares
const { validateInputs } = require('../middlewares/validate-inputs');

// Helper
const {
  purchaseOrderExistById,
  // branchExistById,
  // supplierExistById
} = require('../helpers/db-validators');

// Controllers
const {
  getPurchaseOrder,
  getPurchaseOrderById,
  createPurchaseOrder,
  deletePurchaseOrder,
} = require('../controllers/purchase-orders.controller');

// Rutas
const router = Router();
// /api/purchase

// Get an PurchaseOrder by id [Public]
router.get('/', getPurchaseOrder);

// Get an PurchaseOrder by id [Public]
router.get('/:id', [
	check('id').custom(purchaseOrderExistById),
	validateInputs
], getPurchaseOrderById );

// Create PurchaseOrder [Public]
router.post('/', [
	// check('purchase_date').isDate({format: 'DD-MM-YYYY'}),
	// check('pay_date').isDate(),
	check('branch_id', 'The branch_id is obligatory').not().isEmpty(),
	// check('id').custom( branchExistById ),
	check('supplier_id', 'The supplier_id is obligatory').not().isEmpty(),
	// check('id').custom( supplierExistById ),
	check('invoice', 'The invoice number is obligatory').not().isEmpty(),
	check('amount', 'The amount is obligatory').not().isEmpty(),
	// TODO: Validation for array of products {id, cant, cost}
    validateInputs,
], createPurchaseOrder);

// Delete an PurchaseOrder by id [Public]
router.delete('/:id', [
	check('id').custom(purchaseOrderExistById),
	validateInputs
], deletePurchaseOrder );

module.exports = router;

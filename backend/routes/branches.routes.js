const { Router } = require('express')
const { check } = require('express-validator');

// Middlewares
const { validateInputs } = require('../middlewares/validate-inputs')
const { validateJWT } = require('../middlewares/validate-jwt');
const { isAdminRole } = require('../middlewares/validate-role');

// Helpers
const { 
    branchExistById,
} = require('../helpers/db-validators');

// Controllers
const { 
    getBranches,
	getBranchById,
	createBranch,
	updateBranch,
	deleteBranch 
} = require('../controllers/branches.controller');

// Rutas
const router = Router();
// /api/branches

// Get an Branch by id [Public]
router.get('/', getBranches );

// Get an Branch by id [Public]
router.get('/:id', [
    check('id').custom( branchExistById ),
    validateInputs
], getBranchById );

// Create Branch [Private]
router.post('/', [
	validateJWT,
	isAdminRole,
    check('name', 'The name is obligatory').not().isEmpty(),
    validateInputs
], createBranch );

// Update Branch [Private]
router.put('/:id', [
    validateJWT,
    isAdminRole,
    check('id').custom( branchExistById ),
    validateInputs
], updateBranch );

// Delete branch [Private]
router.delete('/:id', [
	validateJWT,
    isAdminRole,
    check('id').custom( branchExistById ),
    validateInputs
], deleteBranch );

module.exports = router;
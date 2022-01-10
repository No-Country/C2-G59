const { Router } = require('express')

// Middlewares
const { validateInputs } = require('../middlewares/validate-inputs')

// Controllers
const { 
    getBranches,
	getBranchById,
	createBranch,
	updateBranch,
	deleteBranch 
} = require('../controllers/branches.controller')

// Rutas
const router = Router();
// /api/branches

// router.post('/login', [
//     validateInputs
// ], authLogin );

module.exports = router;
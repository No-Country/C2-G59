const { Router } = require('express');

// Middlewares
const { validateInputs } = require('../middlewares/validate-inputs');

// Controllers
const { getBranchesProfit } = require('../controllers/charts.controller');


// Rutas /api/charts
const router = Router();

router.get('/branches-profit', getBranchesProfit );

module.exports = router;
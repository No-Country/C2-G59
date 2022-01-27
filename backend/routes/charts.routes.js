const { Router } = require('express');

// Controllers
const { 
    getBranchesProfit,
    getBranchesCompareData,
    getBranchesProfitTotal,
    getBranchesTransactionCount,
} = require('../controllers/charts.controller');

// Rutas /api/charts
const router = Router();

router.get('/branches-profit', getBranchesProfit );
router.get('/branches-compare-data', getBranchesCompareData ); // Analytics
router.get('/branches-profit-total', getBranchesProfitTotal );
router.get('/branches-transaction', getBranchesTransactionCount );

module.exports = router;
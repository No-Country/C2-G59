const { Router } = require('express')

// Middlewares
const { validateInputs } = require('../middlewares/validate-inputs')

// Controllers
const { authLogin } = require('../controllers/auth.controller')

// Rutas
const router = Router();
// /api/users

// router.post('/login', [
//     validateInputs
// ], authLogin );

module.exports = router;
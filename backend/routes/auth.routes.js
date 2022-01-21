const { Router } = require('express')
const { check } = require('express-validator')

// Middlewares
const { validateInputs } = require('../middlewares/validate-inputs')

// Controllers
const { authLogin } = require('../controllers/auth.controller')

// Rutas
const router = Router();
// /api/auth

router.post('/login', [
    check('email', 'The email is required').isEmail(),
    check('password', 'The password is required').not().isEmpty(),
    validateInputs
], authLogin );

module.exports = router;
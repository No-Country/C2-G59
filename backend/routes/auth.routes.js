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
    // check('email', 'The email is required').isEmail(),
    // check('password', 'The password is required').not().isEmpty(),
    validateInputs
], authLogin );

router.post('/register', [
    // check('name', 'The name is obligatory').not().isEmpty(),
    // check('password', 'The password must contain at least 6 characters').isLength({ min: 6 }),
    // check('email', 'This isn\'t a valid email').isEmail(),
    // check('email').custom( emailExist ),
    // check('role', 'This isn\'t a valid role').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    // check('role').custom( isRoleValid ),
    validateInputs
], authLogin );


module.exports = router;
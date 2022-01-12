const { Router } = require('express')
const { check } = require('express-validator');

// Middlewares
const { validateInputs } = require('../middlewares/validate-inputs')

// Helpers
const { 
    emailExist,
    isRoleValid,
    userExistById,
} = require('../helpers/db-validators');

// Controllers
const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} = require('../controllers/users.controller');
const { validateJWT } = require('../middlewares/validate-jwt');
const { isManagerRole } = require('../middlewares/validate-role');

// Rutas
const router = Router();
// /api/users

// Get Users [Public]
router.get('/', getUsers );

// Get an User by id [Public]
router.get('/:id', [
    check('id').custom( userExistById ),
    validateInputs
], getUserById );

// Create User [Public]
router.post('/', [
    check('name', 'The name is obligatory').not().isEmpty(),
    check('password', 'The password must contain at least 6 characters').isLength({ min: 6 }),
    check('email', 'This isn\'t a valid email').isEmail(),
    check('email').custom( emailExist ),
    check('role').custom( isRoleValid ),
    validateInputs
], createUser );

// Update User [Private]
router.put('/:id', [
    validateJWT,
    isManagerRole,
    check('id').custom( userExistById ),
    check('role').custom( isRoleValid ),
    validateInputs
], updateUser );

// Delete user [Private]
router.delete('/:id', [
    validateJWT,
    isManagerRole,
    check('id').custom( userExistById ),
    validateInputs
], deleteUser );

module.exports = router;
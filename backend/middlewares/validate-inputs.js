const { validationResult } = require('express-validator');

const validateInputs = (req, res, next) => {

    // Retener errores - express-validator
    const errors = validationResult(req);

    if ( !errors.isEmpty() ) {
        return res.status(400).json(errors);
    }

    next();
};

module.exports = {
    validateInputs
};
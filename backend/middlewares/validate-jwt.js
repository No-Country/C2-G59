const jwt = require('jsonwebtoken');
const { User } = require('../db/models/user.model');

const validateJWT = async(req, res, next) => {
    
    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            msg: 'There is no token in the request'
        });
    }

    try {
        
        const { uid, exp } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        // TODO: Crear validacion de fecha de expiracion
        console.log(new Date(exp * 1000));

        const user = await User.findOne({ where: { id: uid }});

        // Verificar que user no sea undefined
        if ( !user ) {
            res.status(401).json({
                msg: 'Invalid token'
            });
        }

        // Verificar si el user tiene status:true
        if ( user.status !== 1) {
            res.status(401).json({
                msg: 'Invalid token'
            });
        }

        // Se envia el user para que este disponible en la req
        req.user = user;

        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'Invalid token'
        });
    }

};

module.exports = {
    validateJWT
};
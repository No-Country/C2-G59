// Esta response se usa para que aparezca la ayuda de VS Code con las res
const { request, response } = require('express');
const bcrypt = require('bcryptjs');

// Mis imports
// const User = require('../models/user');

// GET
const usersGet = async(req = request, res = response) => {

    // const { limit = 5, from = 0 } = req.query;
    // const query = { status: true };

    // const [ totalResults, users ] = await Promise.all([
    //     User.countDocuments( query ),
    //     User.find( query ) // Para regresar todos los users
    //         .skip(Number( from )) // Desde que numero lo regresa
    //         .limit(Number( limit )) // Cantidad de resultados
    // ]);
    
    // res.status(200).json({ 
    //     totalResults,
    //     users
    // });
};

// POST
const usersPost = async (req = request, res = response) => {

    const { name, email, password, role } = req.body;
    // const user = new User( { name, email, role } );

    // // Encriptar password
    // const salt = bcrypt.genSaltSync();
    // user.password = bcrypt.hashSync(password, salt);

    // // Guardar en DB
    // await user.save();

    // res.status(200).json({ user });
};

// PUT
const usersPut = async(req = request, res = response) => {

    // const { id } = req.params;
    // const { _id, password, google, email, ...restUser } = req.body;

    // // TODO: validar contra DB

    // if ( password ) {
    //     // Encriptar password
    //     const salt = bcrypt.genSaltSync();
    //     restUser.password = bcrypt.hashSync(password, salt);
    // }

    // // Esto regresa el user antes de cambiar los valores
    // const user = await User.findByIdAndUpdate(id, restUser);

    // res.status(200).json({ user });
};

// DELETE
const usersDelete = async(req = request, res = response) => {
    
    const { id } = req.params;

    // Borrar fisicamente
    // const user = await User.findByIdAndDelete( id );

    // Cambiar el status para que no aparezca activo
    // const user = await User.findByIdAndUpdate(id, { status: false });

    // res.status(200).json({ user });
};

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete,
};
const { request, response } = require('express');
const bcrypt = require('bcryptjs');

const { User } = require('../db/models/user.model');
const { generateJWT } = require('../helpers/generate-jwt')

const authLogin = async(req = request, res = response) => {

	const { email, password } = req.body

	try {

		// Verificar si email existe en base de datos
		const user = await User.findOne({ where: { email } });

		if ( !user ) {
			return res.status(400).json({
					msg: 'Wrong email or password' /*+ `[user]: ${user}`*/
			});
		}

		// Verificar si el user esta activo en la DB (status: 1)
		if ( user.status !== 1 ) {
			return res.status(400).json({
					msg: 'Wrong email or password' /*+ `[status]: ${user.status}`*/
			});
		}

		// Verificar contraseña encriptada
		const validPassword = bcrypt.compareSync(password, user.password);
		if ( !validPassword ) {
				return res.status(400).json({
						msg: 'Wrong email or password' /*+ `[password]: ${validPassword}`*/
				});
		}

		// Generar el JWT
		const token = await generateJWT( user.id );
		
		res.status(200).json({
			user,
			token
		});

	} catch(error) {
		console.log(error);
		res.status(500).json({
				msg: 'Talk to the admin'
		});
	}

}

module.exports = {
	authLogin
}
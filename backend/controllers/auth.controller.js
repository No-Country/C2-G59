const { request, response } = require('express')

const authLogin = async(req = request, res = response) => {

	const { email, pass } = req.body


	try {

		// Verificar si email existe en base de datos
		// const user = await User.findOne({ email });

		// if ( !user ) {
		// 	return res.status(400).json({
		// 			msg: 'Wrong email or password'
		// 	});
		// }

		// Verificar si el user esta activo en la DB (status: true)
		// if ( !user.status ) {
		// 	return res.status(400).json({
		// 			msg: 'Wrong email or password'
		// 	});
		// }

		// Verificar contraseña encriptada
		// const validPassword = bcrypt.compareSync(password, user.password);
		// if ( !validPassword ) {
		// 		return res.status(400).json({
		// 				msg: 'Wrong email or password'
		// 		});
		// }

		// Generar el JWT
		// const token = await generateJWT( user.id );
		
		res.status(200).json({
			// user,
			// token
			ok: true,
			msg: 'authLogin',
			email,
			pass
		});

	} catch(error) {
		console.log(error);
		res.status(500).json({
				msg: 'Talk to the admin'
		});
	}



}

const authRegister = async(req = request, res = response) => {

	// const { name, email, password, role } = req.body;
	// const user = new User( { name, email, role } );

	// Encriptar password
	// const salt = bcrypt.genSaltSync();
	// user.password = bcrypt.hashSync(password, salt);

	// Guardar en DB
	// await user.save();

	// res.status(200).json({ user });

	res.json({
		ok: true,
		msg: 'authRegister',
		data: req.body
	})

}

module.exports = {
	authLogin
}
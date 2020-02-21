const pool = require('./conexion.controller');

const crypto = require('crypto');
const key = 'Ml6I23Sw0B1P/oTZpSQyjDLfcEp+LKlUjdgE8KwhUyVVZds2RYspI1DzJw6GPAnE';

const doLogin = async (req, res) => {
	const { usuario, contrasena } = req.body;

	//Encriptacion
	const hash = crypto.createHmac('sha256', key)
						.update(contrasena)
						.digest('hex');
	//Fin encriptacion

	const response = await pool.query(`CALL "IPCA".iniciar_sesion('${usuario}', '${hash}', null, null,null)`);

	res.status(200).json(response.rows);
	console.log(response);
}


module.exports = {
	doLogin
}
const pool = require('./conexion.controller');

const crypto = require('crypto');
const key = 'Ml6I23Sw0B1P/oTZpSQyjDLfcEp+LKlUjdgE8KwhUyVVZds2RYspI1DzJw6GPAnE';

const getEmpleados = async (req, res) => {
	const response = await pool.query(`SELECT * FROM "IPCA".obtener_empleados(0, 0);`);
	res.status(200).json(response.rows);
	console.log(response);
}

const setEmpleado = async (req, res) => {
	const {
		nombre,
		apellido,
		cedula,
		fechaNacimiento,
		direccion,
		telefono,
		correo,
		sueldo,
		cargo,
		usuario,
		clave,
		rol
	} = req.body;

	//Inicio Encriptacion
	const hash = crypto.createHmac('sha256', key)
						.update(clave)
						.digest('hex');
	//Fin Encriptacion

	const response = await pool.query(
		`CALL "IPCA".agregar_empleado(
			'${nombre}',
			'${apellido}',
			'${cedula}',
			'${fechaNacimiento}',
			'${direccion}',
			'${telefono}',
			'${correo}',
			'${sueldo}',
			'${cargo}',
			'${usuario}',
			'${hash}',
			'${rol}',
			null,
			null
		)`
	);

	console.log(response);

	if(response.rows[0]['pv_error'] || response.rows[0]['pv_error'] != null) {
		res.json({
			message: response.rows[0]['pv_mensaje'],
			description: response.rows[0]['pv_error']
		});
	} else {
		res.json({
			message: "Terapista agregado correctamente",
			body: {
				terapista: {
					nombre,
					apellido,
					cedula,
					fechaNacimiento,
					direccion,
					telefono,
					correo,
					sueldo,
					cargo,
					usuario,
					clave,
					rol
				}
			}
		});
	}
}


module.exports = {
	getEmpleados,
	setEmpleado
}
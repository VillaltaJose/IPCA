const pool = require('./conexion.controller');

const crypto = require('crypto');
const key = 'Ml6I23Sw0B1P/oTZpSQyjDLfcEp+LKlUjdgE8KwhUyVVZds2RYspI1DzJw6GPAnE';

/*======== PERSONAL GENERAL ========*/

const getEmpleados = async (req, res) => {
	const response = await pool.query(`SELECT * FROM "IPCA".obtener_empleados(0, 0);`);
	res.status(200).json(response.rows);
	console.log(response);
}

const getEmpleadoByID = async (req, res) => {
	const response = await pool.query(`SELECT * FROM "IPCA".obtener_empleados(${[req.params.id]}, 0);`);
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
			message: "Empleado agregado correctamente",
			body: {
				empleado: {
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

const upEmpleado = async (req, res) => {
	const {
		codigo,
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
		`CALL "IPCA".actualizar_empleado(
			${codigo},
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
			message: "Empleado actualizado correctamente",
			body: {
				empleado: {
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

const delEmpleado = async (req, res) => {
	const response = await pool.query(`CALL "IPCA".eliminar_empleado(${[req.params.id]}, null, null);`);
	res.status(200).json(response.rows);
	console.log(response);
}

/*======== TERAPISTAS ========*/
const setTerapista = async (req, res) => {
	const {
		codigo,
		area,
		nivel
	} = req.body;

	const response = await pool.query(
		`CALL "IPCA".actualizar_terapista(
			${codigo},
			'${area}',
			'${nivel}',
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
			message: "Terapista actualizado exitosamente",
			body: {
				terapista: {
					codigo,
					area,
					nivel
				}
			}
		});
	}
}

const getTerapista = async (req, res) => {
	const response = await pool.query(`SELECT * FROM "IPCA".obtener_empleados(0, 1);`);
	res.status(200).json(response.rows);
	console.log(response);
}

const getTerapistaByID = async (req, res) => {
	const response = await pool.query(`SELECT * FROM "IPCA".obtener_empleados(${[req.params.id]}, 1);`);
	res.status(200).json(response.rows);
	console.log(response);
}


module.exports = {
	getEmpleados,
	getEmpleadoByID,
	setEmpleado,
	delEmpleado,
	upEmpleado,
	getTerapista,
	getTerapistaByID,
	setTerapista,
}
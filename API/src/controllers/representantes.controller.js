const pool = require('./conexion.controller');

const getRepresentantes = async (req, res) => {
	const response = await pool.query(`SELECT * FROM "IPCA".obtener_representantes(0);`);
	res.status(200).json(response.rows);
	console.log(response);
}

const getRepresentanteById = async (req, res) => {
	const response = await pool.query(`SELECT * FROM "IPCA".obtener_representantes(${[req.params.id]});`);
	
	if(response.rowCount == 0) {
		res.json({
			message: `Representante no encontrado`,
			description: `El representante con el código ${[req.params.id]} no existe.`
		});
	} else {
		res.status(200).json(response.rows);
	}

	console.log(response);
}

const setRepresentante = async (req, res) => {
	const {
		nombre,
		apellido,
		fechaNacimiento,
		direccion,
		telefono,
		correo,
		cedula
	} = req.body;

	const response = await pool.query(
		`CALL "IPCA".agregar_representante(
			'${nombre}',
			'${apellido}',
			'${fechaNacimiento}',
			'${direccion}',
			'${telefono}',
			'${correo}',
			'${cedula}',
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
			message: "Representante agregado exitosamente",
			body: {
				representante: {
					nombre,
					apellido,
					fechaNacimiento,
					direccion,
					telefono,
					correo,
					cedula
				}
			}
		});
	}
}

const upRepresentante = async (req, res) => {
	const {
		codigo,
		nombre,
		apellido,
		fechaNacimiento,
		direccion,
		telefono,
		correo,
		cedula
	} = req.body;

	const response = await pool.query(
		`CALL "IPCA".actualizar_representante(
			'${codigo}',
			'${nombre}',
			'${apellido}',
			'${fechaNacimiento}',
			'${direccion}',
			'${telefono}',
			'${correo}',
			'${cedula}',
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
			message: "Representante actualizado exitosamente",
			body: {
				paciente: {
					codigo,
					nombre,
					apellido,
					fechaNacimiento,
					direccion,
					telefono,
					correo,
					cedula
				}
			}
		});
	}
}

const delRepresentante = async (req, res) => {
	const response = await pool.query(`CALL "IPCA".eliminar_representante(${[req.params.id]}, null, null);`);

	console.log(response);
	if(response.rows[0]['pv_error'] || response.rows[0]['pv_error'] != null) {
		res.json({
			message: response.rows[0]['pv_mensaje'],
			description: response.rows[0]['pv_error']
		});
	} else {
		res.json({message: "Representante eliminado exitosamente"});
	}
}

module.exports = {
	getRepresentantes,
	getRepresentanteById,
	setRepresentante,
	upRepresentante,
	delRepresentante
}
const pool = require('./conexion.controller');

const getPacientesNombres = async (req, res) => {
	const response = await pool.query(`SELECT * FROM "IPCA".obtener_pacientes_nombres();`);
	res.status(200).json(response.rows);
	console.log(response);
}

const getPacientes = async (req, res) => {
	const response = await pool.query(`SELECT * FROM "IPCA".obtener_pacientes(0);`);
	
	if(response.rowCount == 0) {
		res.json({
			message: `No hay datos`,
			description: `No existen pacientes registrados`
		});
	} else {
		res.status(200).json(response.rows);
	}

	console.log(response);
}

const getPacientesById = async (req, res) => {
	const response = await pool.query(`SELECT * FROM "IPCA".obtener_pacientes(${[req.params.id]});`);

	if(response.rowCount == 0) {
		res.json({
			message: `Paciente no encontrado`,
			description: `El paciente con el código ${[req.params.id]} no existe.`
		});
	} else {
		res.status(200).json(response.rows);
	}

	console.log(response);
}

const setPaciente = async (req, res) => {
	const {
		nombre,
		apellido,
		fechaNacimiento,
		nivel,
		curso,
		diagnostico,
		codigo_representante,
		cedula,
		direccion
	} = req.body;

	const response = await pool.query(
		`CALL "IPCA".agregar_paciente(
			'${nombre}',
			'${apellido}',
			'${fechaNacimiento}',
			'${nivel}',
			'${curso}',
			'${diagnostico}',
			'${codigo_representante}',
			'${cedula}',
			'${direccion}',
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
			message: "Paciente agregado exitosamente",
			body: {
				paciente: {
					nombre,
					apellido,
					fechaNacimiento,
					nivel,
					curso,
					diagnostico,
					codigo_representante,
					cedula,
					direccion
				}
			}
		});
	}
}

const upPaciente = async (req, res) => {
	const {
		codigo,
		nombre,
		apellido,
		fechaNacimiento,
		nivel,
		curso,
		diagnostico,
		codigo_representante,
		cedula,
		direccion
	} = req.body;

	const response = await pool.query(
		`CALL "IPCA".actualizar_paciente(
			'${codigo}',
			'${nombre}',
			'${apellido}',
			'${fechaNacimiento}',
			'${nivel}',
			'${curso}',
			'${diagnostico}',
			'${codigo_representante}',
			'${cedula}',
			'${direccion}',
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
			message: "Paciente agregado exitosamente",
			body: {
				paciente: {
					codigo,
					nombre,
					apellido,
					fechaNacimiento,
					nivel,
					curso,
					diagnostico,
					codigo_representante,
					cedula,
					direccion
				}
			}
		});
	}
}

const delPaciente = async (req, res) => {
	const response = await pool.query(`CALL "IPCA".eliminar_paciente(${[req.params.id]}, null, null);`);

	console.log(response);
	if(response.rows[0]['pv_error'] || response.rows[0]['pv_error'] != null) {
		res.json({
			message: response.rows[0]['pv_mensaje'],
			description: response.rows[0]['pv_error']
		});
	} else {
		res.json({message: "Paciente eliminado exitosamente"});
	}
}

module.exports = {
	getPacientesNombres,
	getPacientes,
	getPacientesById,
	setPaciente,
	upPaciente,
	delPaciente
}
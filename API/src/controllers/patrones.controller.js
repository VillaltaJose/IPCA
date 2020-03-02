const pool = require('./conexion.controller');

const getPatrones = async (req, res) => {
	const response = await pool.query(`SELECT * FROM "IPCA".obtener_secuencias(0);`);
	
	if(response.rowCount == 0) {
		res.json({
			message: `No hay datos`,
			description: `No existen roles registrados`
		});
	} else {
		res.status(200).json(response.rows);
	}

	console.log(response);
}

const getPatronById = async (req, res) => {
	const response = await pool.query(`SELECT * FROM "IPCA".obtener_secuencias(${[req.params.id]});`);

	if(response.rowCount == 0) {
		res.json({
			message: `Patron no encontrado`,
			description: `El patron con el código ${[req.params.id]} no existe.`
		});
	} else {
		res.status(200).json(response.rows);
	}

	console.log(response);
}

const setPatron = async (req, res) => {
	const {
		nombre,
		secuencia,
		tiempo,
		descripcion
	} = req.body;

	const response = await pool.query(
		`CALL "IPCA".agregar_secuencia(
			'${nombre}', 
			'${secuencia}', 
			${tiempo}, 
			'${descripcion}', 
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
			message: "Patron agregado correctamente",
			body: {
				patron: {
					nombre,
					secuencia,
					tiempo,
					descripcion
				}
			}
		});
	}
}

const upPatron = async (req, res) => {
	const {
		codigo,
		nombre,
		secuencia,
		tiempo,
		descripcion
	} = req.body;

	const response = await pool.query(
		`CALL "IPCA".actualizar_secuencia(
			'${codigo}', 
			'${nombre}', 
			'${secuencia}', 
			${tiempo}, 
			'${descripcion}', 
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
			message: "Patron actualizado correctamente",
			body: {
				patron: {
					codigo,
					nombre,
					secuencia,
					tiempo,
					descripcion
				}
			}
		});
	}
}

const delPatron = async (req, res) => {
	const response = await pool.query(`CALL "IPCA".eliminar_secuencia(${[req.params.id]}, null, null);`);

	console.log(response);
	if(response.rows[0]['pv_error'] || response.rows[0]['pv_error'] != null) {
		res.json({
			message: response.rows[0]['pv_mensaje'],
			description: response.rows[0]['pv_error']
		});
	} else {
		res.json({message: "Patron eliminado exitosamente"});
	}
}

module.exports = {
	getPatrones,
	getPatronById,
	setPatron,
	upPatron,
	delPatron
}
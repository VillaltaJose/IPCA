const pool = require('./conexion.controller');

const getCargos = async (req, res) => {
	const response = await pool.query(`SELECT * FROM "IPCA".obtener_cargos(0);`);
	
	if(response.rowCount == 0) {
		res.json({
			message: `No hay datos`,
			description: `No existen cargos registrados`
		});
	} else {
		res.status(200).json(response.rows);
	}

	console.log(response);
}

const getCargoById = async (req, res) => {
	const response = await pool.query(`SELECT * FROM "IPCA".obtener_cargos(${[req.params.id]});`);

	if(response.rowCount == 0) {
		res.json({
			message: `Cargo no encontrado`,
			description: `El cargo con el código ${[req.params.id]} no existe.`
		});
	} else {
		res.status(200).json(response.rows);
	}

	console.log(response);
}

const setCargo = async (req, res) => {
	const {
		nombre,
		descripcion
	} = req.body;

	const response = await pool.query(
		`CALL "IPCA".agregar_cargo(
			'${nombre}',
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
			message: "Cargo agregado exitosamente",
			body: {
				cargo: {
					nombre,
					descripcion
				}
			}
		});
	}
}

const upCargo = async (req, res) => {
	const {
		codigo,
		nombre,
		descripcion
	} = req.body;

	const response = await pool.query(
		`CALL "IPCA".actualizar_cargo(
			${codigo},
			'${nombre}',
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
			message: "Cargo actualizado exitosamente",
			body: {
				cargo: {
					codigo,
					nombre,
					descripcion
				}
			}
		});
	}
}

const delCargo = async (req, res) => {
	const response = await pool.query(`CALL "IPCA".eliminar_cargo(${[req.params.id]}, null, null);`);

	console.log(response);
	if(response.rows[0]['pv_error'] || response.rows[0]['pv_error'] != null) {
		res.json({
			message: response.rows[0]['pv_mensaje'],
			description: response.rows[0]['pv_error']
		});
	} else {
		res.json({message: "Cargo eliminado exitosamente"});
	}
}

module.exports = {
	getCargos,
	getCargoById,
	setCargo,
	upCargo,
	delCargo
}
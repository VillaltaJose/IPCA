const pool = require('./conexion.controller');

const getTerapias = async (req, res) => {
	const response = await pool.query(`SELECT * FROM "IPCA".obtener_terapias(0);`);
	
	if(response.rowCount == 0) {
		res.json({
			message: `No hay datos`,
			description: `No existen terapias registradas`
		});
	} else {
		res.status(200).json(response.rows);
	}

	console.log(response);
}

const getTerapiasById = async (req, res) => {
	const response = await pool.query(`SELECT * FROM "IPCA".obtener_terapias(${[req.params.id]});`);

	if(response.rowCount == 0) {
		res.json({
			message: `Terapia no encontrada`,
			description: `La terapia con el código ${[req.params.id]} no existe.`
		});
	} else {
		res.status(200).json(response.rows);
	}

	console.log(response);
}

const setTerapia = async (req, res) => {
	const {
		tipo,
		fecha,
		aciertos,
		observaciones,
		codPaciente,
		codPatron,
		codTerapista
	} = req.body;

	const response = await pool.query(
		`CALL "IPCA".agregar_terapia(
			'${tipo}',
			'${fecha}',
			${aciertos},
			'${observaciones}',
			${codPaciente},
			${codPatron},
			${codTerapista},
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
			message: "Terapia registrada exitosamente",
			body: {
				terapia: {
					tipo,
					fecha,
					aciertos,
					observaciones,
					codPaciente,
					codPatron,
					codTerapista
				}
			}
		});
	}
}

const delTerapia = async (req, res) => {
	const response = await pool.query(`CALL "IPCA".eliminar_terapia(${[req.params.id]}, null, null);`);

	console.log(response);
	if(response.rows[0]['pv_error'] || response.rows[0]['pv_error'] != null) {
		res.json({
			message: response.rows[0]['pv_mensaje'],
			description: response.rows[0]['pv_error']
		});
	} else {
		res.json({message: "Terapia eliminada exitosamente"});
	}
}


module.exports = {
	getTerapias,
	getTerapiasById,
	setTerapia,
	delTerapia,
}
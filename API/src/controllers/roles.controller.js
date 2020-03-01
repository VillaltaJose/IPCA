const pool = require('./conexion.controller');

const getRoles = async (req, res) => {
	const response = await pool.query(`SELECT * FROM "IPCA".obtener_roles(0);`);
	
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

const getRolesById = async (req, res) => {
	const response = await pool.query(`SELECT * FROM "IPCA".obtener_roles(${[req.params.id]});`);

	if(response.rowCount == 0) {
		res.json({
			message: `Cargo no encontrado`,
			description: `El rol con el código ${[req.params.id]} no existe.`
		});
	} else {
		res.status(200).json(response.rows);
	}

	console.log(response);
}

const setRol = async (req, res) => {
	const {
		nombre,
		descripcion,
		permisos
	} = req.body;

	const response = await pool.query(
		`CALL "IPCA".agregar_rol(
			'${nombre}',
			'${descripcion}',
			'${permisos}',
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
			message: "Rol agregado exitosamente",
			body: {
				cargo: {
					nombre,
					descripcion,
					permisos
				}
			}
		});
	}
}

const upRol = async (req, res) => {
	const {
		codigo,
		nombre,
		descripcion,
		permisos
	} = req.body;

	const response = await pool.query(
		`CALL "IPCA".actualizar_rol(
			${codigo},
			'${nombre}',
			'${descripcion}',
			'${permisos}',
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
			message: "Rol actualizado exitosamente",
			body: {
				cargo: {
					codigo,
					nombre,
					descripcion,
					permisos
				}
			}
		});
	}
}

const delRol = async (req, res) => {
	const response = await pool.query(`CALL "IPCA".eliminar_rol(${[req.params.id]}, null, null);`);

	console.log(response);
	if(response.rows[0]['pv_error'] || response.rows[0]['pv_error'] != null) {
		res.json({
			message: response.rows[0]['pv_mensaje'],
			description: response.rows[0]['pv_error']
		});
	} else {
		res.json({message: "Rol eliminado exitosamente"});
	}
}

module.exports = {
	getRoles,
	getRolesById,
	setRol,
	upRol,
	delRol
}
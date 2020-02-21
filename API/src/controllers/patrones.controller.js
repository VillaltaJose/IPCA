const pool = require('./conexion.controller');

const getPatrones = async (req, res) => {
	const response = await pool.query('SELECT * FROM "IPCA".patrones');
	res.status(200).json(response.rows);
	console.log(response);
}

const getPatronById = async (req, res) => {
	const response = await pool.query('SELECT * FROM "IPCA".patrones WHERE cod_patron=$1', [req.params.id]);
	console.log(response);
	res.json(response.rows);
}

const setPatron = async (req, res) => {
	const {
		nombre,
		secuencia,
		tiempo,
		descripcion
	} = req.body;

	const response = await pool.query(
		'INSERT INTO "IPCA".patrones' +
		'(nom_patron, sec_patron, tiempo_patron, desc_patron)' +
		'VALUES ($1, $2, $3, $4)',
		[nombre, secuencia, tiempo, descripcion]
	);

	console.log(response);

	res.json({
		message: "Patron agregado correctamente",
		body: {
			patron: {nombre, secuencia, tiempo, descripcion}
		}
	});
}

const delPatron = async (req, res) => {
	const response = await pool.query("DELETE FROM users WHERE id=$1", [req.params.id]);
	console.log(response);
	res.json(`Patron ${req.params.id} eliminado correctamente!`);
}

const uptPatron = async (req, res) => {
	const {
		codigo,
		nombre,
		secuencia,
		tiempo,
		descripcion
	} = req.body;

	const response = await pool.query(
		'UPDATE "IPCA".patrones' +
		'SET nom_patron=$1, sec_patron=$2, tiempo_patron=$3, desc_patron=$4 ' +
		'WHERE cod_patron=$5',
		[nombre, secuencia, tiempo, descripcion, codigo]
	);

	console.log(response);

	res.json({
		message: "Patron agregado correctamente",
		body: {
			patron: {codigo, nombre, secuencia, tiempo, descripcion}
		}
	});
}

module.exports = {
	getPatrones,
	setPatron,
	getPatronById,
	delPatron,
	uptPatron
}
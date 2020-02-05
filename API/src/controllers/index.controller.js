const pool = require('./conexion.controller');


const getUsers = async (req, res) => {
	const response = await pool.query("SELECT * FROM users");
	res.status(200).json(response.rows);
}

const setUser = async (req, res) => {
	const { name, email } = req.body;

	const response = await pool.query("INSERT INTO users(name, email) VALUES ($1, $2)", [name, email]);
	console.log(response);
	res.json({
		message: "Usuario creado correctamente",
		body: {
			user: {name, email}
		}
	});
}

const getUserById = async (req, res) => {
	const response = await pool.query("SELECT * FROM users WHERE id=$1", [req.params.id]);
	console.log(response);
	res.json(response.rows);
}

const delUserById = async (req, res) => {
	const response = await pool.query("DELETE FROM users WHERE id=$1", [req.params.id]);
	console.log(response);
	res.json(`User ${req.params.id} eliminado correctamente!`);
}


module.exports = {
	getUsers,
	setUser,
	getUserById,
	delUserById
}
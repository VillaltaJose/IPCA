const { Pool } = require('pg');

const pool = new Pool({
	host: 'localhost',
	user: 'postgres',
	password: 'root',
	database: 'IPCA',
	port: '5432'
})

module.exports = pool;
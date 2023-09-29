
const { pool } = require('../config/db')

const ping = async (req, res) => {
    const [resultado] = await pool.query('SELECT 1+1*6 AS Result');
    res.json(resultado[0])
}

module.exports = { ping }
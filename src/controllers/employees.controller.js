const { pool } = require('../config/db')
const getEmployees = async (req, res) => {

    try {
        const [rows] = await pool.query('SELECT * FROM employee');
        res.json(rows);
    } catch (error) {
        return res.status(500).json({ "message": "Something goes wrong" })
    }

}

const getEmployeeByID = async (req, res) => {
    try {
        const id = req.params.id;
        const [rows] = await pool.query('SELECT * FROM employee where id = ?', [id]);
        if (rows.length < 1) return res.status(404).json({ "message": 'Employee not found' });
        res.json(rows);
    } catch (error) {
        return res.status(500).json({ "message": "Something goes wrong" })
    }
}

const updateEmployees = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, salary } = req.body;

        const [result] = await pool.query('UPDATE employee SET name = IFNULL(?, name) , salary = IFNULL(?, salary) WHERE id = ?', [name, salary, id]);

        if (result.affectedRows === 0) return res.status(404).json({ "message": 'Employee not found' });

        const [rows] = await pool.query('SELECT * FROM employee where id=?', [id])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({ "message": "Something goes wrong" })
    }
}

const deleteEmployees = async (req, res) => {
    try {
        const id = req.params.id;
        const [result] = await pool.query('DELETE FROM employee where id = ?', [id]);
        if (result.affectedRows <= 0) return res.status(404).json({ "message": 'Employee not found' });

        //res.status(204);
        res.send({
            "message": 'Employee Deleted successful'
        })
    } catch (error) {
        return res.status(500).json({ "message": "Something goes wrong" })
    }
}

const createEmployees = async (req, res) => {
    try {
        const { name, salary } = req.body;
        const [rows] = await pool.query('INSERT INTO employee (name, salary) VALUES (?,?)', [name, salary])
        res.send({
            id: rows.insertId,
            name,
            salary
        })
    } catch (error) {
        return res.status(500).json({ "message": "Something goes wrong" })
    }
}

module.exports = {
    getEmployees,
    updateEmployees,
    deleteEmployees,
    createEmployees,
    getEmployeeByID
}
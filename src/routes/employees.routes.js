const { Router } = require('express');
const { getEmployees, updateEmployees, deleteEmployees, createEmployees, getEmployeeByID } = require('../controllers/employees.controller');

const router = Router();

router.get('/employees', getEmployees);
router.get('/employees/:id', getEmployeeByID);
router.post('/employees', createEmployees);
router.patch('/employees/:id', updateEmployees);
router.delete('/employees/:id', deleteEmployees)


module.exports = router; 
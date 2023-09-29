
const express = require('express');

const routerEmployees = require('./routes/employees.routes');
const routerIndex = require('./routes/index.routes');
const server = express()

server.use(express.json())

//rutas
server.use('/api', routerEmployees);
server.use(routerIndex);
server.use((req, res, next) => {
    res.status(404).json({
        "message": "Not Found",
    })
})


module.exports = server;
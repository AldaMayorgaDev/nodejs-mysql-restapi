const { Router } = require('express');
const { ping } = require('../controllers/index.controller')

const router = Router();

router.get('/ping', ping)

module.exports = router;
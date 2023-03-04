const express = require('express');
const sseServer = require('./sseServer');

const router = express.Router();

router.get('/server', sseServer);

module.exports = router;

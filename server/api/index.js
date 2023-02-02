const express = require('express');
const startNewGame = require('./startNewGame');

const router = express.Router();

router.get('/start/:id', startNewGame);

module.exports = router;

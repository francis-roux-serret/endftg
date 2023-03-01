const express = require('express');
const startNewGame = require('./startNewGame');
const connectOnePlayer = require('./connectOnePlayer');

const router = express.Router();

router.post('/createGame', startNewGame);
router.post('/connectOnePlayer', connectOnePlayer);

module.exports = router;

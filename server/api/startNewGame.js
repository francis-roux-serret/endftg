const initNewGame = require('../utilities/initNewGame');
const prepareDataForPlayer = require('../utilities/prepareDataForPlayer');
const store = require('../store');

function startNewGame(req, res) {
  const gameData = initNewGame(req.body);
  res.json(prepareDataForPlayer(gameData, null));
  store.saveToDisk();
}

module.exports = startNewGame;

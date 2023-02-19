const initNewGameStore = require('../utilities/initNewGameStore');

function startNewGame(req, res) {
  const config = {
    players: [
      { id: 1, label: 'Joueur 1', race: 'human', color: 'white' },
      { id: 2, label: 'Joueur 2', race: 'human', color: 'black' },
    ],
    modules: ['root', 'wormhole'],
    ...req.data,
  };

  const gameStore = initNewGameStore(config);
  res.render(JSON.stringify(gameStore));
}

module.exports = startNewGame;

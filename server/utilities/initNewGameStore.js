const store = require('../store');

/* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["gameData"] }] */
function initStacks(gameData)
{
  const players = [
    { id: 1, label: 'Joueur 1', race: 'human', color: 'white' },
    { id: 2, label: 'Joueur 2', race: 'human', color: 'black' },
  ];
  const modules = ['root', 'wormhole'];
}

function initNewGameStore(config) {
  const gameData = store.newGame({});
  gameData.players = [
    { id: 1, label: 'Joueur 1', race: 'human', color: 'white' },
    { id: 2, label: 'Joueur 2', race: 'human', color: 'black' },
  ];
  initStacks(gameData);
}

module.exports = initNewGameStore;

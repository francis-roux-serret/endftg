const store = require('../store');
const itemSacks = require('../itemSacks');
const map = require('../map');
const reference = require('./reference');
const species = require('../../app/data/species');
const randomPick = require('./randomPick');

function createShip(color, race, type) {
  return { color, race, type };
}

function createBadge(vp) {
  return { kind: 'badge', vp };
}

/* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["gameData"] }] */
function initSacks({ players, modules }) {
  players.forEach(p => {
    const shipTypes = [
      { type: 'interceptor', nb: 8 },
      { type: 'fregate', nb: 4 },
      { type: 'cruiser', nb: 2 },
      { type: 'base', nb: 4 },
    ];
    shipTypes.forEach(({ type, nb }) => {
      const sackName = `${p.color}-${p.race}-${type}`;
      itemSacks.createSack(sackName);
      for (let i = 0; i < nb; i += 1) {
        itemSacks.addOne(sackName, createShip(p.color, p.red, type));
      }
    });
  });

  itemSacks.createSack('badge', true, true);
  for (let i = 0; i < 4; i += 1) itemSacks.addOne('badge', createBadge(4));
  for (let i = 0; i < 6; i += 1) itemSacks.addOne('badge', createBadge(3));
  for (let i = 0; i < 10; i += 1) itemSacks.addOne('badge', createBadge(2));
  for (let i = 0; i < 12; i += 1) itemSacks.addOne('badge', createBadge(1));

  itemSacks.createSack('gift', true, false);
  itemSacks.addOne('gift', { kind: 'gift' });

  itemSacks.createSack('ancient', false);
  itemSacks.addOne('ancient', { kind: 'ancient' });

  itemSacks.createSack('guardian', false);
  itemSacks.addOne('ancient', { kind: 'guardian' });

  itemSacks.createSack('center', false);
  itemSacks.addOne('center', { kind: 'center' });

  itemSacks.createSack('artefact', false);
  itemSacks.addOne('artefact', { kind: 'artefact' });

  if (modules.includes('wormhole')) {
    itemSacks.createSack('wormhole', false);
    itemSacks.addOne('wormhole', { kind: 'wormhole' });
  }
}

function initGame(playerConfig)
{
  map.addTile(0, 0, 0, itemSacks.pickOne('ring0'));
  const playerTemplate = species.find(s => s.id === playerConfig.race);
  const sectors = [...playerTemplate.sectors];

  playerConfig.positions.forEach(({ x, y }, index) => {
    const tileId = randomPick(sectors, 1, true);
    const tile = itemSacks.pickWithId('ring2', tileId);
    map.addTile(x, y, index, tile);
  });

  return {
    ...playerConfig,
    ...JSON.parse(JSON.stringify(playerTemplate)),
  };
}

function initNewGameStore() {
  const config = {
    players: [
      { id: 1, label: 'Joueur 1', race: 'human', color: 'white' },
      { id: 2, label: 'Joueur 2', race: 'human', color: 'black' },
    ],
    modules: ['root', 'wormhole'],
  };
  initSacks(config);
  const gameData = initGame(reference.playerCountConfig[config.players.length]);
  store.newGame(gameData);
}

module.exports = initNewGameStore;

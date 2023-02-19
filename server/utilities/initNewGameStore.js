const store = require('../store');
const Map = require('../Map');
const TechnoBaord = require('../TechnoBoard');
const randomPick = require('./randomPick');

const playerCountConfig = require('../reference/playerCountConfig');
const species = require('../reference/species');
const technos = require('../reference/technos');
const gifts = require('../reference/gifts');
const tiles = require('../reference/tiles');

function createShip(color, race, type) {
  return { kind: 'ship', color, race, type };
}

function createBadge(vp) {
  return { kind: 'badge', vp };
}

/* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["gameData"] }] */
function initSacks(gameData) {
  // Player constructions sacks
  gameData.config.players.forEach(p => {
    const shipTypes = [
      { type: 'interceptor', nb: 8 },
      { type: 'fregate', nb: 4 },
      { type: 'cruiser', nb: 2 },
      { type: 'base', nb: 4 },
      { type: 'monolith', nb: 0 },
      { type: 'orbital', nb: 0 },
    ];
    shipTypes.forEach(({ type, nb }) => {
      const sackName = `${p.color}-${type}`;
      gameData.temSacks.createSack(sackName, nb > 0, false);
      for (let i = 0; i < (nb || 1); i += 1) {
        gameData.itemSacks.addOne(sackName, createShip(p.color, p.race, type));
      }
    });
  });

  // VP sack
  gameData.itemSacks.createSack('badge', true, true);
  const counts = [[4, 4], [3, 6], [2, 10], [1, 12]];
  counts.forEach(([vp, nb]) => {
    for (let i = 0; i < nb; i += 1) {
      gameData.itemSacks.addOne('badge', createBadge(vp));
    }
  });

  // NPCs sacks
  gameData.itemSacks.createSack('ancient', false, false);
  gameData.itemSacks.addOne('ancient', { kind: 'ancient' });
  gameData.itemSacks.createSack('guardian', false, false);
  gameData.itemSacks.addOne('ancient', { kind: 'guardian' });
  gameData.itemSacks.createSack('center', false, false);
  gameData.itemSacks.addOne('center', { kind: 'center' });
  gameData.itemSacks.createSack('artefact', false, false);
  gameData.itemSacks.addOne('artefact', { kind: 'artefact' });

  // Modules specific sacks
  if (gameData.config.modules.includes('wormhole')) {
    gameData.itemSacks.createSack('wormhole', false, false);
    gameData.itemSacks.addOne('wormhole', { kind: 'wormhole' });
  }

  // Gifts sack
  gameData.itemSacks.createSack('gift', true, true);
  gifts
    .filter(gift => gameData.config.modules.includes(gift.group))
    .foreach(gift => {
      for (let i = 0; i < gift.count; i += 1) {
        gameData.itemSacks.addOne('gift', gift);
      }
    });

  // Technos sack
  gameData.itemSacks.createSack('techno', true, true);
  technos
    .filter(techno => gameData.config.modules.includes(techno.group))
    .foreach(techno => {
      for (let i = 0; i < techno.count; i += 1) {
        gameData.itemSacks.addOne('techno', techno);
      }
    });

  // Tiles sacks
  gameData.itemSacks.createSack('homeTile', true, true);
  tiles
    .filter(t => t.group === 'home')
    .forEach(t => {
      gameData.itemSacks.addOne('homeTile', t);
    });
  for (let i = 0; i <= 3; i += 1) {
    const ringSackName = `ring${i}`;
    gameData.itemSacks.createSack(ringSackName, true, true);
    const tilesToAdd = tiles.filter(
      t => gameData.config.modules.includes(t.group) && t.ring === i,
    );
    tilesToAdd.forEach(t => {
      gameData.itemSacks.addOne(ringSackName, t);
    });
  }

  return gameData.itemSacks;
}

function initGame(gameData) {
  gameData.map.addTile(0, 0, 0, gameData.itemSacks.pickOne('ring0'));
  const playerTemplate = species.find(s => s.id === 'human');
  const sectors = [...playerTemplate.sectors];

  const countBasedConfig = playerCountConfig[gameData.config.players.length];
  countBasedConfig.positions.forEach(({ x, y }, index) => {
    const tileId = randomPick(sectors, 1, true);
    const tile = gameData.itemSacks.pickWithId('ring2', tileId);
    gameData.map.addTile(x, y, index, tile);
  });

  gameData.alliances = countBasedConfig.alliances;
  gameData.nbPick = countBasedConfig.nbPick;
  gameData.technoBoard.pickNewTechnos(countBasedConfig.nbTechnos);
  gameData.itemSacks.shrinkSack('ring3', countBasedConfig.nbSector3);
}

function initNewGameStore(config) {
  const gameData = store.newGame(config);
  const sacks = initSacks(gameData);
  gameData.map = new Map(sacks);
  gameData.technoBoard = new TechnoBaord(gameData.itemSacks);
  initGame(gameData);
  store.saveGame(gameData);

  return gameData;
}

module.exports = initNewGameStore;

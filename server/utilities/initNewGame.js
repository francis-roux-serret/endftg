const crypto = require('crypto');

const store = require('../store');
const StarMap = require('../StarMap');
const TechnoBaord = require('../TechnoBoard');

const playerCountConfig = require('../reference/playerCountConfig');
const technos = require('../reference/technos');
const gifts = require('../reference/gifts');
const tiles = require('../reference/tiles');
const ItemSacks = require('../ItemSacks');
const createShip = require('./createShip');
const Player = require('../Player');
const createItem = require('./createItem');

function createBadge(vp) {
  return { kind: 'badge', vp };
}

/* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["gameData"] }] */
function initSacks(gameData) {
  gameData.itemSacks = new ItemSacks();
  // Player constructions sacks
  gameData.config.players.forEach(p => {
    const shipTypes = [
      { type: 'interceptor', nb: 8 },
      { type: 'cruiser', nb: 4 },
      { type: 'dreadnought', nb: 2 },
      { type: 'starbase', nb: 4 },
    ];
    shipTypes.forEach(({ type, nb }) => {
      const sackName = `${p.color}-${type}`;
      gameData.itemSacks.createSack(sackName, nb > 0, false);
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
  ['ancient', 'guardian', 'center'].forEach(type => {
    gameData.itemSacks.createSack(type, false, false);
    gameData.itemSacks.addOne(type, createShip('gray', 'npc', type));
  });

  // Items sacks
  ['artefact', 'monolith', 'orbital'].forEach(type => {
    gameData.itemSacks.createSack(type, false, false);
    gameData.itemSacks.addOne(type, createItem(type));
  });

  // Modules specific sacks
  gameData.config.modules.push('root');
  if (gameData.config.modules.includes('wormhole')) {
    gameData.itemSacks.createSack('wormhole', false, false);
    gameData.itemSacks.addOne('wormhole', { kind: 'wormhole' });
  }

  // Gifts sack
  gameData.itemSacks.createSack('gift', true, true);
  gifts
    .filter(gift => gameData.config.modules.includes(gift.group))
    .forEach(gift => {
      for (let i = 0; i < gift.count; i += 1) {
        gameData.itemSacks.addOne('gift', gift);
      }
    });

  // Technos sack
  gameData.itemSacks.createSack('techno', true, true);
  technos
    .filter(techno => gameData.config.modules.includes(techno.group))
    .forEach(techno => {
      for (let i = 0; i < techno.count; i += 1) {
        gameData.itemSacks.addOne('techno', techno);
      }
    });

  // home sacks
  gameData.itemSacks.createSack('homeTile', true, true);
  tiles
    .filter(t => t.group === 'home')
    .forEach(t => {
      gameData.itemSacks.addOne('homeTile', t);
    });

  // guardian tiles sacks
  gameData.itemSacks.createSack('guardianTile', true, true);
  tiles
    .filter(t => t.group === 'guardian')
    .forEach(t => {
      gameData.itemSacks.addOne('guardianTile', t);
    });

  // Game tile sacks
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

function createPlayersHashes(gameData) {
  gameData.players.forEach(player => {
    let longHash = null;
    let hash = null;
    let exists = true;
    let attempt = 200;
    while (exists && attempt) {
      const RANGE = 1000000;
      const x = Math.round(Math.random() * RANGE);
      const shasum = crypto.createHash('sha1');
      shasum.update(`${x}`);
      longHash = shasum.digest('hex');
      hash = longHash.substring(0, 6);
      exists = store.checkIfHashExists(hash);
      attempt -= 1;
    }
    if (exists) throw new Error('Server is full');

    player.setHashes(hash, longHash);
  });
}

function initGame(gameData) {
  gameData.players = gameData.config.players.map((config, index) => {
    const player = new Player(index);
    player.importConfig(config);

    return player;
  });
  const centerTileTemplate = gameData.itemSacks.pickOne('ring0');
  gameData.starmap.addTile(0, 0, 0, centerTileTemplate);
  const countBasedConfig = playerCountConfig[gameData.players.length];

  // Game status
  gameData.status = {
    round: 0,
    phase: 'init',
    turn: 0,
    playerIndex: 0,
    passedPlayers: [],
    remainingRing3: countBasedConfig.nbSector3,
    playerOrder: gameData.players.map(p => p.id),
  };

  // Players
  gameData.players.forEach((player, index) => {
    // Pick home
    const tileId = player.pickHomeSectorId();
    const tile = gameData.itemSacks.pickWithId('homeTile', tileId);

    // Place it on map
    const { x, y, rotation } = countBasedConfig.positions[index];
    const mapTile = gameData.starmap.addTile(x, y, rotation, tile);
    mapTile.owner = index + 1;

    // Use disc
    player.pickOneDisc();

    // Colonise colonisable places
    const colonisablePlanetTypes = player.getColonisablePlanetTypes();
    const freePlaces = gameData.starmap.getFreeColonisablePlaces(
      player.id,
      colonisablePlanetTypes,
    );
    freePlaces.forEach(place => {
      const planetType = place.accept[0];
      if (player.removeCube(planetType)) {
        gameData.starmap.setTileObjectPopulation(
          place.tileId,
          place.kind,
          place.id,
          true,
        );
      }
    });

    // Add starting ship(s)
    player.getInitialShipsSackNames().forEach(sackName => {
      const ship = gameData.itemSacks.pickOne(sackName);
      gameData.starmap.addShip(tileId, ship);
    });
  });

  // Guardians on remaining tiles
  countBasedConfig.guardians.forEach(({ x, y, rotation }) => {
    const tile = gameData.itemSacks.pickOne('guardianTile');
    gameData.starmap.addTile(x, y, rotation, tile);
  });

  // game config
  gameData.alliances = countBasedConfig.alliances;
  gameData.nbPick = countBasedConfig.nbPick;
  gameData.technoBoard.pickNewTechnos(countBasedConfig.nbTechnos);
  gameData.itemSacks.shrinkSack('ring3', countBasedConfig.nbSector3);

  // Update status
  // TODO: startRound() and set isStarted when all players are connected
}

function initNewGame(config) {
  const gameData = store.newGame(config);
  initSacks(gameData);
  gameData.starmap = new StarMap(gameData.itemSacks);
  gameData.technoBoard = new TechnoBaord(gameData.itemSacks);
  initGame(gameData);
  createPlayersHashes(gameData);

  store.saveGame(gameData);

  return gameData;
}

module.exports = initNewGame;

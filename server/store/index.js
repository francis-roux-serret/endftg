const fs = require('fs').promises;

const StarMap = require('../StarMap');
const ItemSacks = require('../ItemSacks');
const TechnoBoard = require('../TechnoBoard');
const logger = require('../logger');

const SAVE_PATH_NAME = 'data/store.json';

class Store {
  constructor() {
    this.games = [];
  }

  async loadFromDisk() {
    const self = this;
    const exists = await self.checkIfFileExists();
    if (!exists) {
      return;
    }

    try {
      /** @var {string} jsonData */
      const jsonData = await fs.readFile(SAVE_PATH_NAME, {
        encoding: 'utf8',
      });

      const data = JSON.parse(jsonData);
      data.forEach(serializedGame => {
        const itemSacks = new ItemSacks();
        itemSacks.deserialize(data.itemSacks);

        const starmap = new StarMap(itemSacks);
        starmap.deserialize(serializedGame.starmap);

        const technoBoard = new TechnoBoard(itemSacks);
        technoBoard.deserialize(serializedGame.technoBoard);

        self.games.push({
          gameId: data.gameId,
          itemSacks,
          starmap,
          technoBoard,
          alliances: data.alliances,
          players: data.players,
        });
      });
    } catch (err) {
      console.error('Error reading save', err);
    }
  }

  saveToDisk() {
    try {
      const data = this.games.map(game => ({
        gameId: game.gameId,
        itemSacks: game.itemSacks && game.itemSacks.serialize(),
        starmap: game.starmap && game.starmap.serialize(),
        technoBoard: game.technoBoard && game.technoBoard.serialize(),
        alliances: game.alliances,
        players: game.players,
      }));

      return fs.writeFile(SAVE_PATH_NAME, JSON.stringify(data));
    } catch (err) {
      logger.error('Error writing save', err);

      return Promise.reject(err);
    }
  }

  async checkIfFileExists() {
    try {
      await fs.access(SAVE_PATH_NAME, fs.constants.W_OK);

      return true;
    } catch (err) {
      return false;
    }
  }

  saveGame(data) {
    this.deleteGame(data);
    this.games.push(data);
    this.saveToDisk().then(() => {
      logger.info(`Game store saved`);
    });
  }

  loadGame(gameId) {
    return this.games.find(g => g.gameId === gameId);
  }

  deleteGame(data) {
    this.games = this.games.filter(g => g.gameId !== data.gameId);
  }

  newGame(config) {
    let gameId;
    do {
      gameId = `${Date.now()}-${Math.floor(Math.random() * 9000 + 1000)}`;
    } while (this.loadGame(gameId));

    const gameData = { gameId, config, isStarted: false };
    this.saveGame(gameData);

    return gameData;
  }

  findGameAndPlayerForHash(hash) {
    let returnValue = [null, null];
    this.games.some(game => {
      const foundPlayer = game.players.find(p => p.hash === hash);
      if (foundPlayer && !game.isStarted) {
        returnValue = [game, foundPlayer];

        return true;
      }

      return false;
    });

    return returnValue;
  }

  findGameAndPlayerForLongHash(longHash) {
    let returnValue = [null, null];
    this.games.some(game => {
      const foundPlayer = game.players.find(p => p.longHash === longHash);
      if (foundPlayer) {
        returnValue = [game, foundPlayer];

        return true;
      }

      return false;
    });

    return returnValue;
  }

  checkIfHashExists(hash) {
    const [foundGame] = this.findGameAndPlayerForHash(hash);

    return foundGame !== null;
  }
}

const instance = new Store();

module.exports = instance;

class Store {
  constructor() {
    this.games = [];
  }

  saveGame(data) {
    this.deleteGame(data);
    this.games.push(data);
  }

  loadGame(gameId) {
    return this.games.find(g => g.gameId === gameId);
  }

  deleteGame(data) {
    this.games = this.games.filter(g => g.gameId !== data.gameId);
  }

  newGame(data) {
    let gameId;
    do {
      gameId = `${Date.now()}-${Math.floor(Math.random() * 9000 + 1000)}`;
    } while (this.loadGame(gameId));

    const gameData = {
      ...data,
      gameId,
    };
    this.saveGame(gameData);

    return gameData;
  }
}

const instance = new Store();

module.exports = instance;

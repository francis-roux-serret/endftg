const store = {
  data: {
    games: {},
  },
  api: {
    saveGame: data => {
      store.deleteGame(data);
      store.data.games.push(data);
    },
    loadGame: gameId => {
      return store.data.games.find(g => g.gameId === gameId);
    },
    deleteGame: data => {
      store.data.games = store.data.games.filter(g => g.gameId !== data.gameId);
    },
    newGame: data => {
      let gameId;
      do {
        gameId = `${Date.now()}-${Math.floor(Math.random() * 9000 + 1000)}`;
      } while (store.loadGame(gameId));
      const gameData = {
        ...data,
        gameId,
      };
      store.saveGame(gameData);

      return gameData;
    },
  },
};

export default store.api;

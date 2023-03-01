function exportPlayer(playerData, isCurrent) {
  return {
    ...playerData,
    isCurrent, // TODO: change this
  };
}

function exportGame(gameData) {
  // TODO: change this
  return {
    round: 0,
    ...gameData,
  };
}

function prepareDataForPlayer(gameData, playerId) {
  return {
    config: {
      ...gameData.config,
      alliances: gameData.alliances,
    },
    starmap: {
      tiles: gameData.starmap.tiles,
      connections: gameData.starmap.connections,
    },
    players: gameData.players.map(player =>
      exportPlayer(player, player.id === playerId),
    ),
    technoBoard: gameData.technoBoard.trees,
    game: exportGame(gameData),
  };
}

module.exports = prepareDataForPlayer;

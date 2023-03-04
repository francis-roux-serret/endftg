function exportPlayer(playerData, isCurrent) {
  return {
    ...playerData,
    hasPassed: false, // TODO: Change this
    isCurrent, // TODO: change this
  };
}

function prepareDataForPlayer(gameData, playerId) {
  return {
    config: {
      ...gameData.config,
      alliances: gameData.alliances,
    },
    status: {
      round: 1,
      phase: 'move',
    },
    starmap: {
      tiles: gameData.starmap.tiles.map(tile => ({
        ...tile,
        items: tile.items.map(item => ({
          ...item,
          kind: item.kind.substring(0, 2) === 'g_' ? 'gift' : item.kind,
        })),
      })),
      connections: gameData.starmap.connections,
    },
    players: gameData.players.map(player =>
      exportPlayer(player, player.id === playerId),
    ),
    technoBoard: gameData.technoBoard.trees,
  };
}

module.exports = prepareDataForPlayer;

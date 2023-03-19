function exportPlayer(player, index, isConnected) {
  return {
    ...player.export(),
    isConnected,
    // TODO: Change the following
    hasPassed: false,
    order: index + 1,
    traitor: false,
    firstPlayer: false,
  };
}

function prepareDataForPlayer(gameData, playerId) {
  const preparedData = {
    config: {
      ...gameData.config,
      alliances: gameData.alliances,
    },
    status: {
      round: 1,
      phase: 'move',
      turn: 1,
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
    players: gameData.players.map((player, index) =>
      exportPlayer(player, index, player.id === playerId),
    ),
    technoBoard: gameData.technoBoard.trees,
  };

  console.log(preparedData);
  return preparedData;
}

module.exports = prepareDataForPlayer;

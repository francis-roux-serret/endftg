function exportPlayer(player, index, isConnected, gameData) {
  return {
    ...player.export(),
    isConnected,
    // TODO: Change the following
    hasPassed: gameData.status.passedPlayers.includes(player.id),
    order: (gameData.status.playerOrder || []).indexOf(player.id),
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
      ...gameData.status,
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
      exportPlayer(player, index, player.id === playerId, gameData),
    ),
    technoBoard: gameData.technoBoard.trees,
  };

  return preparedData;
}

module.exports = prepareDataForPlayer;

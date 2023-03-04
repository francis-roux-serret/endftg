const store = require('../store');
const logger = require('../logger');
const prepareDataForPlayer = require('../utilities/prepareDataForPlayer');
const gameUpdateMessage = require('./messages/gameUpdateMessage');

const playerConnections = {};

function sendMessageToOnePlayer(playerId, message) {
  if (!playerConnections[playerId]) {
    throw Error(`No such player ${playerId}`);
  }

  const { res } = playerConnections[playerId];
  if (res) {
    logger.debug(`Sending`, message);
    res.write(`data: ${JSON.stringify(message)}\n\n`);
  } else {
    playerConnections[playerId].messages.push(message);
  }
}

function sseServer(req, res) {
  const { hash } = req.query;

  // Find player and game
  const [game, player] = store.findGameAndPlayerForLongHash(hash);
  if (!player) {
    throw Error(`No such hash ${hash}`);
  }

  logger.info(`SSE cnx for player #${player.id}, game #${game.gameId}`);

  // Starts SSE connection with client
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  // Retrieve or create player message stack, store res
  playerConnections[player.id] = {
    messages: [],
    ...(playerConnections[player.id] || {}),
    res,
  };

  // Send messages stuck in message stack
  playerConnections[player.id].messages.forEach(message => {
    sendMessageToOnePlayer(player.id, message);
  });

  // Send game status
  sendMessageToOnePlayer(
    player.id,
    gameUpdateMessage(prepareDataForPlayer(game, player.id)),
  );

  // If client closes connection, stop sending events and clear res
  res.on('close', () => {
    logger.warn('client dropped sse');
    playerConnections[player.id].res = null;
    res.end();
  });
}

module.exports = sseServer;

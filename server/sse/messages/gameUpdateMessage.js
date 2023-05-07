const {
  SSE_GAME_UPDATE,
} = require('../../../app/containers/GamePage/sseMessages');

module.exports = gameData => ({ kind: SSE_GAME_UPDATE, gameData });

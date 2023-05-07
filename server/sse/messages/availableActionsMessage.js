const {
  SSE_AVAILABLE_ACTIONS,
} = require('../../../app/containers/GamePage/sseMessages');

module.exports = availableActions => ({
  kind: SSE_AVAILABLE_ACTIONS,
  availableActions,
});

const gameUpdateMessage = require('../sse/messages/gameUpdateMessage');
const prepareDataForPlayer = require('../utilities/prepareDataForPlayer');
const { sendMessageToOnePlayer } = require('../sse/sseServer');
const AvailableActionsFinder = require('./AvailableActionsFinder');
const availableActionsMessage = require('../sse/messages/availableActionsMessage');

class GameEngine {
  constructor(gameData, playerId) {
    this.gameData = gameData;
    this.playerId = playerId;
  }

  isCurrentPlayer() {
    return (
      this.gameData.status.playerOrder[this.gameData.status.playerIndex] ===
      this.playerId
    );
  }

  connectToPlayerClient() {
    sendMessageToOnePlayer(
      this.playerId,
      gameUpdateMessage(prepareDataForPlayer(this.gameData, this.playerId)),
    );
    if (this.isCurrentPlayer()) {
      this.sendCurrentPlayerPhase();
    }
  }

  sendCurrentPlayerPhase() {
    console.log(
      `Preparing status for player #${this.playerId}, phase = ${
        this.gameData.status.phase
      }`,
    );
    switch (this.gameData.status.phase) {
      case 'init':
      case 'actions': {
        const finder = new AvailableActionsFinder(this.gameData, this.playerId);
        sendMessageToOnePlayer(
          this.playerId,
          availableActionsMessage(finder.getResult()),
        );
        break;
      }
      case 'next_activation': {
        break;
      }
      case 'must_trade': {
        break;
      }
      case 'place_tile': {
        break;
      }
      case 'pick_gift': {
        break;
      }
      case 'influence': {
        break;
      }
      case 'pick_vp': {
        break;
      }
      case 'fight_turn': {
        break;
      }
      case 'alliance_request': {
        break;
      }
      case 'attack_pop': {
        break;
      }
      case 'send_pop': {
        break;
      }
      case 'bankrupt': {
        break;
      }
      case 'finish': {
        break;
      }
      case 'wait':
      default:
      // do nothing
    }
  }

  processPlayerInput(input) {
    console.log(input);
  }
}

module.exports = GameEngine;

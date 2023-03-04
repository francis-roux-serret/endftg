/*
 *
 * GamePage actions
 *
 */

import { LOAD_GAME, SET_STATUS_MESSAGE, STORE_GAME_UPDATE } from './constants';

export function loadGame(gameId) {
  return {
    type: LOAD_GAME,
    data: { gameId },
  };
}

export function storeGameUpdate(gameData) {
  return {
    type: STORE_GAME_UPDATE,
    data: { gameData },
  };
}

export function setStatusMessage(statusMessage) {
  return {
    type: SET_STATUS_MESSAGE,
    data: { statusMessage },
  };
}

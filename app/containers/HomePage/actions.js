/*
 *
 * GamePage actions
 *
 */

import { CONNECT_PLAYERS, CREATE_GAME, SAVE_GAME_SETTINGS } from './constants';

export function createGame() {
  return { type: CREATE_GAME };
}

export function saveGameSettings(gameSettings) {
  return {
    type: SAVE_GAME_SETTINGS,
    data: gameSettings,
  };
}

export function connectPlayers(players) {
  return { type: CONNECT_PLAYERS, data: players };
}

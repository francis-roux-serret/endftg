/*
 *
 * GamePage actions
 *
 */

import { CREATE_GAME, SAVE_GAME_SETTINGS } from './constants';

export function createGame(gameSettings) {
  return {
    type: CREATE_GAME,
    data: gameSettings,
  };
}

export function saveGameSettings(gameSettings) {
  return {
    type: SAVE_GAME_SETTINGS,
    data: gameSettings,
  };
}

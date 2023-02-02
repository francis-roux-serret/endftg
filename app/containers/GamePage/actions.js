/*
 *
 * GamePage actions
 *
 */

import { LOAD_GAME } from './constants';

export function loadGame(gameId) {
  return {
    type: LOAD_GAME,
    data: { gameId },
  };
}

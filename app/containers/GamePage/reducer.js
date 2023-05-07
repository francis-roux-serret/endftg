/*
 *
 * GamePage reducer
 *
 */
import produce from 'immer';
import { STORE_GAME_UPDATE, SET_STATUS_MESSAGE } from './constants';

export const initialState = {
  statusMessage: null,
  log: [],
  history: [],
  tchat: [],
  gameData: {
    config: {
      players: [],
      npcConfig: {
        ancient: null,
        guardian: null,
        center: null,
      },
      alliances: false,
      modules: ['root', 'wormhole'],
    },
    status: {
      round: 0,
      phase: 'wait',
      turn: 0,
      playerIndex: 0,
      passedPlayers: [],
      remainingRing3: 8,
      playerOrder: [],
    },
    starmap: { tiles: [], connections: [] },
    players: [],
    technoBoard: [],
  },
};

/* eslint-disable default-case, no-param-reassign */
const gamePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_STATUS_MESSAGE:
        draft.statusMessage = action.data.statusMessage;
        break;
      case STORE_GAME_UPDATE:
        draft.gameData = action.data.gameData;
        break;
    }
  });

export default gamePageReducer;

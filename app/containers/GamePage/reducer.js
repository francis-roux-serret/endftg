/*
 *
 * GamePage reducer
 *
 */
import produce from 'immer';
import { LOAD_GAME } from './constants';

export const initialState = {
  config: {
    players: [],
    modules: ['root'],
  },
  log: [],
  history: [],
  tchat: [],
  status: {
    npcConfig: {
      ancient: null,
      guardian: null,
      center: null,
    },
    round: 0,
    players: [],
    starmap: [],
    market: [],
  },
};

/* eslint-disable default-case, no-param-reassign */
const gamePageReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case LOAD_GAME:
        break;
    }
  });

export default gamePageReducer;

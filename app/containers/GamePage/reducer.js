/*
 *
 * GamePage reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION } from './constants';

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
    map: [],
    market: [],
  },
};

/* eslint-disable default-case, no-param-reassign */
const gamePageReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
    }
  });

export default gamePageReducer;

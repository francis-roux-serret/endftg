import { CREATE_GAME, SAVE_GAME_SETTINGS } from './constants';
import colors from './colors';

export const initialState = {
  players: [
    { id: 1, race: 'human', color: colors[0], nickname: 'Player 1' },
    { id: 2, race: 'human', color: colors[1], nickname: 'Player 2' },
  ],
  modules: ['wormholes'],
  npcs: {
    center: 'easy',
    ancient: 'easy',
    guardian: 'easy',
    knownAtStart: true,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SAVE_GAME_SETTINGS:
      return {
        ...state,
        ...action.data,
      };

    default:
      return state;
  }
};

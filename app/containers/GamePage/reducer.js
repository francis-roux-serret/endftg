/*
 *
 * GamePage reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION } from './constants';

export const initialState = {
  log: [],
  config: {
    players: [],
  },
  currentStatus: {
    players: [
      {
        id: 1,
        planets: [
          {
            x: 0,
            y: -2,
            pops: [true, false, true, false, true],
            items: ['interceptor'],
          },
        ],
        sciences: [{ track: 'red', type: 'base' }],
        ships: {
          interceptor: [
            { id: 'hull', part: null },
            { id: 'T', part: 'can_1' },
            { id: 'B', part: 'thr_1' },
            { id: 'L', part: 'pow_3' },
            { id: 'B', part: null },
          ],
          fregate: [
            { id: 'hull', part: null },
            { id: 'T', part: 'can_1' },
            { id: 'B', part: 'hul_1' },
            { id: 'TL', part: 'cmp_1' },
            { id: 'BL', part: 'pow_3' },
            { id: 'TR', part: null },
            { id: 'BR', part: 'thr_1' },
          ],
          cruiser: [
            { id: 'hull', part: null },
            { id: 'T1', part: 'can_1' },
            { id: 'T2', part: 'can_1' },
            { id: 'B1', part: 'hul_1' },
            { id: 'B2', part: 'hul_1' },
            { id: 'TL', part: 'cmp_1' },
            { id: 'BL', part: 'pow_3' },
            { id: 'TR', part: null },
            { id: 'BR', part: 'thr_1' },
          ],
          base: [
            { id: 'hull', part: null },
            { id: 'C', part: null },
            { id: 'TL', part: 'cmp_1' },
            { id: 'BL', part: 'hul_1' },
            { id: 'TR', part: 'can_1' },
            { id: 'BR', part: 'hul_1' },
          ],
        },
        badges: [],
        colons: 3,
        markers: {
          firstDisc: 1,
          nbG: 4,
          nbM: 4,
          nbS: 4,
          popG: 2,
          popM: 2,
          popS: 2,
        },
      },
      {
        id: 2,
        planets: [
          {
            x: 0,
            y: -2,
            pops: [true, false, true, false, true],
            items: ['interceptor'],
          },
        ],
        sciences: [{ track: 'red', type: 'base' }],
        ships: {
          interceptor: [
            { id: 'hull', part: null },
            { id: 'T', part: 'can_1' },
            { id: 'B', part: 'thr_1' },
            { id: 'L', part: 'pow_3' },
            { id: 'B', part: null },
          ],
          fregate: [
            { id: 'hull', part: null },
            { id: 'T', part: 'can_1' },
            { id: 'B', part: 'hul_1' },
            { id: 'TL', part: 'cmp_1' },
            { id: 'BL', part: 'pow_3' },
            { id: 'TR', part: null },
            { id: 'BR', part: 'thr_1' },
          ],
          cruiser: [
            { id: 'hull', part: null },
            { id: 'T1', part: 'can_1' },
            { id: 'T2', part: 'can_1' },
            { id: 'B1', part: 'hul_1' },
            { id: 'B2', part: 'hul_1' },
            { id: 'TL', part: 'cmp_1' },
            { id: 'BL', part: 'pow_3' },
            { id: 'TR', part: null },
            { id: 'BR', part: 'thr_1' },
          ],
          base: [
            { id: 'hull', part: null },
            { id: 'C', part: null },
            { id: 'TL', part: 'cmp_1' },
            { id: 'BL', part: 'hul_1' },
            { id: 'TR', part: 'can_1' },
            { id: 'BR', part: 'hul_1' },
          ],
        },
        badges: [],
        colons: 3,
        markers: {
          firstDisc: 1,
          nbG: 4,
          nbM: 4,
          nbS: 4,
          popG: 2,
          popM: 2,
          popS: 2,
        },
      },
    ],
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

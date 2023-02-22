import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the homePage state domain
 */

const selectHomePage = state => state.homePage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by HomePage
 */

const makeSelectPlayers = () =>
  createSelector(
    selectHomePage,
    state => state.players,
  );

const makeSelectModules = () =>
  createSelector(
    selectHomePage,
    state => state.modules,
  );

const makeSelectNpcs = () =>
  createSelector(
    selectHomePage,
    state => state.npcs,
  );

export { selectHomePage, makeSelectPlayers, makeSelectModules, makeSelectNpcs };

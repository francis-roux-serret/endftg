import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the homePage substate domain
 */

const selectHomePageDomain = state => state.homePage || initialState;

/**
 * Other specific selectors
 */

const makeSelectPlayers = () =>
  createSelector(
    selectHomePageDomain,
    substate => substate.players,
  );

const makeSelectModules = () =>
  createSelector(
    selectHomePageDomain,
    substate => substate.modules,
  );

const makeSelectGameStarting = () =>
  createSelector(
    selectHomePageDomain,
    substate => substate.gameStarting,
  );

const makeSelectNpcs = () =>
  createSelector(
    selectHomePageDomain,
    substate => substate.npcs,
  );

export {
  selectHomePageDomain,
  makeSelectPlayers,
  makeSelectModules,
  makeSelectNpcs,
  makeSelectGameStarting,
};

import axios from 'axios';
import { all } from 'redux-saga/effects'
import { takeLatest, call, put, select } from 'redux-saga/effects';
import {
  makeSelectModules,
  makeSelectNpcs,
  makeSelectPlayers,
} from './selectors';
import { CREATE_GAME } from './constants';
import { connectPlayers } from './actions';

const callCreateGameApi = (players, modules, npcs) =>
  axios
    .post(
      '/app/createGame',
      { players, modules, npcs },
      { headers: { Accept: 'application/json' } },
    )
    .then(response => response.data)
    .catch(err => {
      throw err;
    });

export function* createGame() {
  alert('createGame called !');
  // Select username from store
  const players = yield select(makeSelectPlayers());
  const modules = yield select(makeSelectModules());
  const npcs = yield select(makeSelectNpcs());

  try {
    const playersWithConnection = yield call(
      callCreateGameApi,
      players,
      modules,
      npcs,
    );
    yield put(connectPlayers(playersWithConnection));
  } catch (err) {
    console.error(err);
    //yield put(repoLoadingError(err));
  }
}
// Root saga
export default function* rootSaga() {
  // if necessary, start multiple sagas at once with `all`
  yield all([
    takeLatest(CREATE_GAME, createGame),
    // takeLatest(LOAD_USERS, getUsers),
  ]);
}

import axios from 'axios';
import { takeLatest, call, put, select, all } from 'redux-saga/effects';
import {
  makeSelectModules,
  makeSelectNpcs,
  makeSelectPlayers,
} from './selectors';
import { CONNECT_ONE_PLAYER, CREATE_GAME } from './constants';
import { connectPlayers } from './actions';
import logger from '../../../server/logger';

const apiPost = (subRoute, postData) => {
  const config = { headers: { Accept: 'application/json' } };
  return axios
    .post(`/api/${subRoute}`, postData, config)
    .then(response => response.data)
    .catch(err => {
      throw err;
    });
};

const callCreateGameApi = (players, modules, npcs) =>
  apiPost('createGame', { players, modules, npcs });

const callConnectOnePlayerApi = hash =>
  apiPost('connectOnePlayer', { hash });

export function* createGame() {
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
    logger.error(err);
  }
}
export function* connectOnePlayer({ hash, callback }) {
  try {
    const { longHash } = yield call(callConnectOnePlayerApi, hash);
    callback(longHash);
  } catch (err) {
    logger.error(err);
  }
}

// Root saga
export default function* rootSaga() {
  // if necessary, start multiple sagas at once with `all`
  yield all([
    takeLatest(CREATE_GAME, createGame),
    takeLatest(CONNECT_ONE_PLAYER, connectOnePlayer),
    // takeLatest(LOAD_USERS, getUsers),
  ]);
}

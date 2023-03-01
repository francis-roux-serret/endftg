import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

import { useInjectSaga } from 'utils/injectSaga';
import { DAEMON } from 'utils/constants';

import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import { connectOnePlayer, createGame, saveGameSettings } from './actions';
import {
  makeSelectGameStarting,
  makeSelectModules,
  makeSelectNpcs,
  makeSelectPlayers,
} from './selectors';

import GameConfigurationForm from '../../components/GameConfigurationForm';
import { useInjectReducer } from '../../utils/injectReducer';
import PlayerHashInput from '../../components/PlayerHashInput';

const key = 'homePage';
function HomePage(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga, mode: DAEMON });

  const { players, modules, npcs, gameStarting } = props;
  const colors = ['red', 'green', 'blue', 'black', 'white', 'yellow'];
  const playerLabel = props.intl.formatMessage(messages.player);

  const handleChangePlayer = player => {
    const forcedColors = {
      eridani: 'red',
      draco: 'yellow',
      orion: 'black',
      mechanema: 'white',
      hydran: 'blue',
      planta: 'green',
    };
    const updatedPlayer = {
      ...player,
      color: forcedColors[player.race] || player.color,
    };
    props.saveGameSettings({
      players: players.map(p => (p.id === player.id ? updatedPlayer : p)),
    });
  };

  const handleChangeGame = newSettings => {
    props.saveGameSettings(newSettings);
  };

  const handleAddPlayer = () => {
    const maxId = players.reduce((a, v) => (a < v.id ? v.id : a), 0);
    props.saveGameSettings({
      players: [
        ...players,
        {
          id: maxId + 1,
          race: 'human',
          color: colors[players.length],
          nickname: `${playerLabel} ${maxId + 1}`,
        },
      ],
    });
  };

  const handleRemovePlayer = index => {
    props.saveGameSettings({
      players: players.filter((p, i) => i !== index),
    });
  };

  const handleStartGame = () => {
    props.createGame({ players, modules, npcs });
  };

  const handleHashInput = hash => {
    props.connectOnePlayer(hash, longHash => {
      props.history.push(`/game?hash=${longHash}`);
    });
  };

  return (
    <div>
      <h1>
        <FormattedMessage {...messages.header} />
      </h1>
      <PlayerHashInput onChange={handleHashInput} />
      <GameConfigurationForm
        players={players}
        modules={modules}
        npcs={npcs}
        gameStarting={gameStarting}
        onPlayerAdd={handleAddPlayer}
        onPlayerDelete={handleRemovePlayer}
        onPlayerChange={handleChangePlayer}
        onGameChange={handleChangeGame}
        onValidate={handleStartGame}
      />
    </div>
  );
}

HomePage.propTypes = {
  intl: intlShape.isRequired,
  players: PropTypes.arrayOf(PropTypes.object).isRequired,
  npcs: PropTypes.object.isRequired,
  modules: PropTypes.array.isRequired,
  gameStarting: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  createGame: PropTypes.func.isRequired,
  connectOnePlayer: PropTypes.func.isRequired,
  saveGameSettings: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  players: makeSelectPlayers(),
  npcs: makeSelectNpcs(),
  modules: makeSelectModules(),
  gameStarting: makeSelectGameStarting(),
});

const withConnect = connect(
  mapStateToProps,
  { saveGameSettings, createGame, connectOnePlayer },
);
export default compose(
  withConnect,
  injectIntl,
)(HomePage);

import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

import injectSaga from 'utils/injectSaga';
import { DAEMON } from 'utils/constants';

import messages from './messages';
import saga from './saga';
import { createGame, saveGameSettings } from './actions';
import {
  makeSelectModules,
  makeSelectNpcs,
  makeSelectPlayers,
} from './selectors';

import GameConfigurationForm from '../../components/GameConfigurationForm';

function HomePage(props) {
  const { players, modules, npcs } = props;
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
    createGame({ players, modules, npcs });
  };

  return (
    <div>
      <h1>
        <FormattedMessage {...messages.header} />
      </h1>
      <GameConfigurationForm
        players={players}
        modules={modules}
        npcs={npcs}
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
  createGame: PropTypes.func.isRequired,
  saveGameSettings: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  players: makeSelectPlayers()(state),
  npcs: makeSelectNpcs()(state),
  modules: makeSelectModules()(state),
});

// `mode` is an optional argument, default value is `DAEMON`
const withSaga = injectSaga({ key: 'homepage', saga, mode: DAEMON });

export default compose(
  withSaga,
  connect(
    mapStateToProps,
    { createGame, saveGameSettings },
  ),
)(injectIntl(HomePage));

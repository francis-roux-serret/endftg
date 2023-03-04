import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectGameData, makeSelectStatusMessage } from './selectors';
import reducer from './reducer';
import saga from './saga';
import MapBox from '../../components/MapBox';
import useSSE from '../../utils/useSSE';
import { setStatusMessage, storeGameUpdate } from './actions';

export function GamePage(props) {
  useInjectReducer({ key: 'gamePage', reducer });
  useInjectSaga({ key: 'gamePage', saga });
  const queryParams = new URLSearchParams(window.location.search)
  const hash = queryParams.get('hash');

  const handleSSE = message => {
    switch (message.kind) {
      case 'gameUpdate': {
        props.storeGameUpdate(message.gameData);
        break;
      }
      default:
        console.error(`Unknown SSE kind ${message.kind}`);
    }
  };

  useSSE(
    hash,
    message => handleSSE(message),
    () =>
      props.setStatusMessage('Connection lost to the game, try to refresh.'),
  );

  const { tiles } = props.gameData.starmap;
  const playerColors = props.gameData.players.reduce(
    (a, p) => ({ ...a, [p.id]: p.color }),
    {},
  );

  return (
    <div>
      <Helmet>
        <title>ENDFTG</title>
        <meta name="description" content="One game running" />
      </Helmet>
      <div>
        {props.statusMessage ? <div>{props.statusMessage}</div> : null}
        <MapBox tiles={tiles} playerColors={playerColors} />
      </div>
    </div>
  );
}

GamePage.propTypes = {
  statusMessage: PropTypes.string,
  gameData: PropTypes.object.isRequired,
  setStatusMessage: PropTypes.func.isRequired,
  storeGameUpdate: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  statusMessage: makeSelectStatusMessage(),
  gameData: makeSelectGameData(),
});

const withConnect = connect(
  mapStateToProps,
  { setStatusMessage, storeGameUpdate },
);

export default compose(withConnect)(GamePage);

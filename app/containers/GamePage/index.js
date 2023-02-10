/**
 *
 * GamePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectGamePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import MapBox from '../../components/MapBox';

export function GamePage() {
  useInjectReducer({ key: 'gamePage', reducer });
  useInjectSaga({ key: 'gamePage', saga });

  const tiles = [
    {
      x: 0,
      y: 0,
      id: '001',
      label: 'SDCG',
      ring: 0,
      vp: 4,
      tags: ['center', 'gift', 'artefact', 'workhole'],
      items: [{ kind: 'center' }, { kind: 'gift' }, { kind: 'wormhole' }],
      exits: [1, 0, 1, 1, 0, 0],
      planets: [
        { kind: 'planet', id: `001-S-1`, type: 'S', hasColon: false },
        { kind: 'planet', id: `001-S+-2`, type: 'S+', hasColon: false },
        { kind: 'planet', id: `001-M-3`, type: 'M', hasColon: false },
        { kind: 'planet', id: `001-M+-4`, type: 'M+', hasColon: false },
        { kind: 'planet', id: `001-G-5`, type: 'G', hasColon: false },
        { kind: 'planet', id: `001-G-6`, type: 'G', hasColon: false },
      ],
    },
  ];

  return (
    <div>
      <Helmet>
        <title>The Game</title>
        <meta name="description" content="One game running" />
      </Helmet>
      <div>
        <h2>Title</h2>
        <MapBox tiles={tiles} />
      </div>
    </div>
  );
}

GamePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  gamePage: makeSelectGamePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(GamePage);

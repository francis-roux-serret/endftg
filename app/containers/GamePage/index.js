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
      color: null,
      vp: 4,
      tags: ['center', 'gift', 'artefact', 'workhole'],
      items: [
        { kind: 'gift', id: 'gift' },
        { kind: 'artefact', id: 'artefact' },
        { kind: 'wormhole', id: 'wormhole', vp: 2 },
        { kind: 'monolith', id: 'st-1', vp: 3 },
        { kind: 'orbital', id: 'st-2', hasColon: false },
      ],
      ships: [
        { kind: 'ship', id: 'center', type: 'center', color: null },
        { kind: 'ship', id: 'guardian', type: 'guardian', color: null },
        { kind: 'ship', id: 'ancient', type: 'ancient', color: null },
        { kind: 'ship', id: 'sh-1', type: 'interceptor', color: 'yellow' },
        { kind: 'ship', id: 'sh-2', type: 'cruiser', color: 'red' },
        { kind: 'ship', id: 'sh-3', type: 'dreadnought', color: 'black' },
        { kind: 'ship', id: 'sh-4', type: 'starbase', color: 'white' },
      ],
      exits: [1, 0, 1, 1, 0, 0],
      planets: [
        { kind: 'planet', id: `001-S-1`, type: 'S', hasColon: false },
        { kind: 'planet', id: `001-S+-2`, type: 'S+', hasColon: false },
        { kind: 'planet', id: `001-M-3`, type: 'M', hasColon: false },
        { kind: 'planet', id: `001-M+-4`, type: 'M+', hasColon: false },
        { kind: 'planet', id: `001-G-5`, type: 'G', hasColon: false },
        { kind: 'planet', id: `001-G+-6`, type: 'G+', hasColon: false },
        { kind: 'planet', id: `001-A-7`, type: 'A', hasColon: false },
        { kind: 'planet', id: `001-A+-8`, type: 'A+', hasColon: false },
      ],
    },
    {
      x: 1,
      y: 1,
      id: '001',
      label: 'SDCG',
      ring: 0,
      color: null,
      vp: 4,
      tags: ['center', 'gift', 'artefact', 'workhole'],
      items: [
        { kind: 'gift', id: 'gift' },
        { kind: 'artefact', id: 'artefact' },
        { kind: 'wormhole', id: 'wormhole', vp: 2 },
        { kind: 'monolith', id: 'st-1', vp: 3 },
        { kind: 'orbital', id: 'st-2', hasColon: false },
      ],
      ships: [
        { kind: 'ship', id: 'center', type: 'center', color: null },
        { kind: 'ship', id: 'guardian', type: 'guardian', color: null },
        { kind: 'ship', id: 'ancient', type: 'ancient', color: null },
        { kind: 'ship', id: 'sh-1', type: 'interceptor', color: 'yellow' },
        { kind: 'ship', id: 'sh-2', type: 'cruiser', color: 'red' },
        { kind: 'ship', id: 'sh-3', type: 'dreadnought', color: 'black' },
        { kind: 'ship', id: 'sh-4', type: 'starbase', color: 'white' },
      ],
      exits: [1, 0, 1, 1, 0, 0],
      planets: [
        { kind: 'planet', id: `001-S-1`, type: 'S', hasColon: false },
        { kind: 'planet', id: `001-S+-2`, type: 'S+', hasColon: false },
        { kind: 'planet', id: `001-M-3`, type: 'M', hasColon: false },
        { kind: 'planet', id: `001-M+-4`, type: 'M+', hasColon: false },
        { kind: 'planet', id: `001-G-5`, type: 'G', hasColon: false },
        { kind: 'planet', id: `001-G+-6`, type: 'G+', hasColon: false },
        { kind: 'planet', id: `001-A-7`, type: 'A', hasColon: false },
        { kind: 'planet', id: `001-A+-8`, type: 'A+', hasColon: false },
      ],
    },
    {
      x: 1,
      y: -1,
      id: '001',
      label: 'SDCG',
      ring: 0,
      color: null,
      vp: 4,
      tags: ['center', 'gift', 'artefact', 'workhole'],
      items: [
        { kind: 'gift', id: 'gift' },
        { kind: 'artefact', id: 'artefact' },
        { kind: 'wormhole', id: 'wormhole', vp: 2 },
        { kind: 'monolith', id: 'st-1', vp: 3 },
        { kind: 'orbital', id: 'st-2', hasColon: false },
      ],
      ships: [
        { kind: 'ship', id: 'center', type: 'center', color: null },
        { kind: 'ship', id: 'guardian', type: 'guardian', color: null },
        { kind: 'ship', id: 'ancient', type: 'ancient', color: null },
        { kind: 'ship', id: 'sh-1', type: 'interceptor', color: 'yellow' },
        { kind: 'ship', id: 'sh-2', type: 'cruiser', color: 'red' },
        { kind: 'ship', id: 'sh-3', type: 'dreadnought', color: 'black' },
        { kind: 'ship', id: 'sh-4', type: 'starbase', color: 'white' },
      ],
      exits: [1, 0, 1, 1, 0, 0],
      planets: [
        { kind: 'planet', id: `001-S-1`, type: 'S', hasColon: false },
        { kind: 'planet', id: `001-S+-2`, type: 'S+', hasColon: false },
        { kind: 'planet', id: `001-M-3`, type: 'M', hasColon: false },
        { kind: 'planet', id: `001-M+-4`, type: 'M+', hasColon: false },
        { kind: 'planet', id: `001-G-5`, type: 'G', hasColon: false },
        { kind: 'planet', id: `001-G+-6`, type: 'G+', hasColon: false },
        { kind: 'planet', id: `001-A-7`, type: 'A', hasColon: false },
        { kind: 'planet', id: `001-A+-8`, type: 'A+', hasColon: false },
      ],
    },
    {
      x: 0,
      y: -2,
      id: '001',
      label: 'SDCG',
      ring: 0,
      color: null,
      vp: 4,
      tags: ['center', 'gift', 'artefact', 'workhole'],
      items: [
        { kind: 'gift', id: 'gift' },
        { kind: 'artefact', id: 'artefact' },
        { kind: 'wormhole', id: 'wormhole', vp: 2 },
        { kind: 'monolith', id: 'st-1', vp: 3 },
        { kind: 'orbital', id: 'st-2', hasColon: false },
      ],
      ships: [
        { kind: 'ship', id: 'center', type: 'center', color: null },
        { kind: 'ship', id: 'guardian', type: 'guardian', color: null },
        { kind: 'ship', id: 'ancient', type: 'ancient', color: null },
        { kind: 'ship', id: 'sh-1', type: 'interceptor', color: 'yellow' },
        { kind: 'ship', id: 'sh-2', type: 'cruiser', color: 'red' },
        { kind: 'ship', id: 'sh-3', type: 'dreadnought', color: 'black' },
        { kind: 'ship', id: 'sh-4', type: 'starbase', color: 'white' },
      ],
      exits: [1, 0, 1, 1, 0, 0],
      planets: [
        { kind: 'planet', id: `001-S-1`, type: 'S', hasColon: false },
        { kind: 'planet', id: `001-S+-2`, type: 'S+', hasColon: false },
        { kind: 'planet', id: `001-M-3`, type: 'M', hasColon: false },
        { kind: 'planet', id: `001-M+-4`, type: 'M+', hasColon: false },
        { kind: 'planet', id: `001-G-5`, type: 'G', hasColon: false },
        { kind: 'planet', id: `001-G+-6`, type: 'G+', hasColon: false },
        { kind: 'planet', id: `001-A-7`, type: 'A', hasColon: false },
        { kind: 'planet', id: `001-A+-8`, type: 'A+', hasColon: false },
      ],
    },
  ];

  return (
    <div>
      <Helmet>
        <title>ENDFTG</title>
        <meta name='description' content='One game running' />
      </Helmet>
      <div>
        <MapBox tiles={ tiles } />
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

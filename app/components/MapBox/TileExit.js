import React from 'react';
import PropTypes from 'prop-types';

import HalfWarpGate from '../HalfWarpGate';
import { TILE_H, TILE_W, TILE_R } from './constants';

function TileExit({ isOpen, index }) {
  const angle = Math.PI / 2 - (index * Math.PI) / 3;
  const x = (TILE_R * Math.cos(angle)) / 2;
  const y = -(TILE_R * Math.sin(angle)) / 2;
  return (
    <div
      key={`key_${angle}`}
      style={{
        position: 'relative',
        left: x + TILE_W / 2,
        top: y + TILE_H / 2,
        margin: 0,
        padding: 0,
      }}
    >
      {isOpen ? <HalfWarpGate angle={angle} /> : null}
    </div>
  );
}

TileExit.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
};

export default TileExit;

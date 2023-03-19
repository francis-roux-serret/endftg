/**
 *
 * MapBox
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Tile from './Tile';
import { BOARD_H, BOARD_W } from './constants';
import imgGalaxy from '../../images/ecl_galaxy.png';

const OutsideWrapper = styled.div`
  padding: 0;
  margin: 0;
  border: 0;
  overflow: auto;
  width: auto;
  height: 100vh;
`;

const InsideWrapper = styled.div`
  background-color: #003;
  padding: 0;
  margin: 0;
  border: 0;
  width: ${BOARD_W}px;
  height: ${BOARD_H}px;
  position: relative;
  background-image: url(${imgGalaxy});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;
function MapBox({ tiles, playerColors }) {
  return (
    <OutsideWrapper>
      <InsideWrapper>
        {tiles.map(tile => (
          <Tile key={tile.id} playerColors={playerColors} tile={tile} />
        ))}
      </InsideWrapper>
    </OutsideWrapper>
  );
}

MapBox.propTypes = {
  tiles: PropTypes.arrayOf(PropTypes.object).isRequired,
  playerColors: PropTypes.object.isRequired,
};

MapBox.propTypes = {};

export default MapBox;

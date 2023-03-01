/**
 *
 * MapBox
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Tile from './Tile';

const Wrapper = styled.div`
  background-color: #003;
  padding: 0;
  margin: 0;
  border: 1px solid #22c;
  border-radius: 16px;
`;
function MapBox(props) {
  return (
    <Wrapper style={{ width: 800, height: 800 }}>
      {props.tiles.map(tile => (
        <Tile key={tile.id} tile={tile} />
      ))}
    </Wrapper>
  );
}

MapBox.propTypes = {
  tiles: PropTypes.arrayOf(PropTypes.object).isRequired,
};

MapBox.propTypes = {};

export default MapBox;

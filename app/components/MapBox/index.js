/**
 *
 * MapBox
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TILE_W = 300;
const TILE_H = 300;

function Tile(props) {
  const style = {
    position: 'relative',
    left: '50%',
    top: '50%',
    marginLeft: -TILE_W / 2 + props.tile.x * TILE_W,
    marginTop: -TILE_H / 2 + props.tile.y * TILE_H,
    width: TILE_W,
    height: TILE_H,
    backgroundColor: 'red',
    verticalAlign: 'center',
    // transform: 'scale(0.4,0.4)',
    backgroundImage: 'url("/images/ecl_tile_empty.png")',
  };


  return <div style={style}>tile</div>;
}

Tile.propTypes = {
  tile: PropTypes.object.isRequired,
};

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

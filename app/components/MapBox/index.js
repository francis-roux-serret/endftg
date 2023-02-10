/**
 *
 * MapBox
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import tileEmpty from '../../images/ecl_tile_empty.png';
import tileBlue from '../../images/ecl_tile_blue.png';
import tileRed from '../../images/ecl_tile_red.png';
import tileYellow from '../../images/ecl_tile_yellow.png';
import tileBlack from '../../images/ecl_tile_black.png';
import tileWhite from '../../images/ecl_tile_white.png';
import tileGreen from '../../images/ecl_tile_green.png';
import HalfWarpGate from '../HalfWarpGate';

const TILE_W = 300;
const UNZOOM = 1;
const TILE_H = (TILE_W * 13) / 15;

const BACKGROUNDS = {
  empty: tileEmpty,
  blue: tileBlue,
  red: tileRed,
  yellow: tileYellow,
  black: tileBlack,
  white: tileWhite,
  green: tileGreen,
};

function Tile(props) {
  const { tile } = props;
  const style = {
    position: 'relative',
    left: '50%',
    top: '50%',
    marginLeft: -TILE_W / 2 + props.tile.x * TILE_W,
    marginTop: -TILE_H / 2 + props.tile.y * TILE_H,
    width: TILE_W,
    height: TILE_H,
    verticalAlign: 'center',
    transform: `scale(${UNZOOM})`,
    backgroundImage: `url("${BACKGROUNDS[tile.disc || 'empty']}")`,
    // filter: `opacity(${tile.disc ? 1 : 0.7})`,
    backgroundSize: '100%',
    backgroundPosition: '50%',
    // filter: 'drop-shadow(0 0 10px red)',
  };

  const floatingItems = [<div>ship</div>, <div>ship</div>];
  const vpBadge = `${tile.vp}`;
  const exits = tile.exits.map((exit, index) => {
    const angle = Math.PI / 2 - (index * Math.PI) / 3;
    const x = (TILE_H * Math.cos(angle)) / 2;
    const y = -(TILE_H * Math.sin(angle)) / 2;
    return (
      <div
        key={`key_${angle}`}
        style={{
          position: 'relative',
          left: x,
          top: y,
          margin: 0,
          padding: 0,
        }}
      >
        {exit ? <HalfWarpGate angle={angle} /> : null}
      </div>
    );
  });
  tile.items.forEach(item => {
    switch (item.kind) {
      case 'artefact':
        vpBadge.concat('*');
        break;
      case 'ship':
        floatingItems.push(<div>ship</div>);
        break;
      default:
      // nothing
    }
  });

  return (
    <div style={style}>
      {floatingItems.map(f => f)}
      {exits.map(e => e)}
    </div>
  );
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

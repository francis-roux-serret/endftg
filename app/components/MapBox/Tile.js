import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  BACKGROUNDS,
  ITEMS_DISTANCE,
  PLANETS_DISTANCE,
  SHIPS_DISTANCE,
  TILE_H,
  TILE_W,
  UNZOOM,
} from './constants';
import TileExit from './TileExit';
import items from './items';
import Ship from './Ship';
import Positionner from './Positionner';
import Planet from './Planet';
import VPBadge from './VPBadge';

function Tile(props) {
  const [isHover, setHover] = useState(false);
  const { tile } = props;
  const background = BACKGROUNDS[tile.disc || 'empty'];
  const zoom = isHover ? 1 : UNZOOM;
  const style = {
    overflow: 'show',
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginLeft: tile.x * TILE_W * (3 / 4) * UNZOOM,
    marginTop: ((tile.y * TILE_H) / 2) * UNZOOM,
    width: TILE_W,
    height: TILE_H,
    verticalAlign: 'center',
    transform: `translate(-50%, -50%) scale(${zoom})`,
    zIndex: isHover ? 1000 : 0,
    backgroundImage: `url("${background}")`,
    transitionDuration: '0.2s',
    // filter: `opacity(${tile.disc ? 1 : 0.7})`,
    backgroundSize: '100%',
    backgroundPosition: '50%',
    userSelect: 'none',
    // filter: 'drop-shadow(0 0 10px red)',
  };

  const totalVp = tile.items.reduce(
    (total, item) => total + (item.vp || 0),
    tile.vp,
  );

  const exitObjects = tile.exits.map((exit, index) => (
    <TileExit key={`exit_${index}`} isOpen={!!exit} index={index} />
  ));

  const handleClick = () => setHover(!isHover);
  const handleMouseLeave = () => setHover(false);

  const itemObjects = tile.items.map((item, index) => {
    const ItemElement = items[item.kind];
    return (
      <Positionner
        zoom={zoom}
        key={`item_${item.id}`}
        index={index}
        count={tile.items.length}
        distance={ITEMS_DISTANCE}
      >
        <ItemElement index={index} item={item} />
      </Positionner>
    );
  });

  const planetObjects = tile.planets.map((planet, index) => (
    <Positionner
      zoom={zoom}
      key={`planet_${planet.id}`}
      index={index}
      count={tile.planets.length}
      distance={PLANETS_DISTANCE}
    >
      <Planet index={index} planet={planet} />
    </Positionner>
  ));

  const shipObjects = tile.ships.map((ship, index) => (
    <Positionner
      zoom={zoom}
      key={`ship_${ship.id}`}
      index={index}
      count={tile.ships.length}
      distance={SHIPS_DISTANCE}
    >
      <Ship index={index} ship={ship} />
    </Positionner>
  ));

  return (
    <div
      style={style}
      onClick={handleClick}
      onMouseLeave={handleMouseLeave}
    >
      <VPBadge vp={totalVp} />
      {exitObjects.map(e => e)}
      {itemObjects.map(e => e)}
      {planetObjects.map(e => e)}
      {shipObjects.map(e => e)}
    </div>
  );
}

Tile.propTypes = {
  tile: PropTypes.object.isRequired,
};

export default Tile;

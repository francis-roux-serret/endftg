import React from 'react';
import PropTypes from 'prop-types';
import { BACKGROUNDS, TILE_H, TILE_W, UNZOOM } from './constants';
import TileExit from './TileExit';

function Tile(props) {
  const { tile } = props;
  const background = BACKGROUNDS[tile.disc || 'empty'];
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
    backgroundImage: `url("${background}")`,
    // filter: `opacity(${tile.disc ? 1 : 0.7})`,
    backgroundSize: '100%',
    backgroundPosition: '50%',
    // filter: 'drop-shadow(0 0 10px red)',
  };

  const floatingItems = [];
  const vpBadge = `${tile.vp}`;
  const exits = tile.exits.map((exit, index) => (
    <TileExit key={exit.id} isOpen={!!exit} index={index} />
  ));
  tile.items.forEach(item => {
    switch (item.kind) {
      case 'artefact':
        vpBadge.concat('*');
        break;
      case 'ship':
        // floatingItems.push(<div>ship</div>);
        break;
      default:
      // nothing
    }
  });

  return (
    <div style={style}>
      {exits.map(e => e)}
      {/*{floatingItems.map(f => f)}*/}
    </div>
  );
}

Tile.propTypes = {
  tile: PropTypes.object.isRequired,
};

export default Tile;

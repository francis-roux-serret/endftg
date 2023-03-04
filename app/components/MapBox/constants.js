import tileEmpty from '../../images/ecl_tile_empty.png';
import tileBlue from '../../images/ecl_tile_blue.png';
import tileRed from '../../images/ecl_tile_red.png';
import tileYellow from '../../images/ecl_tile_yellow.png';
import tileBlack from '../../images/ecl_tile_black.png';
import tileWhite from '../../images/ecl_tile_white.png';
import tileGreen from '../../images/ecl_tile_green.png';

const TILE_W = 500;
const UNZOOM = 0.3;
const TILE_H = (TILE_W * 13) / 15;
const TILE_R = TILE_H;
const ITEMS_DISTANCE = TILE_R / 7;
const PLANETS_DISTANCE = (2 * TILE_R) / 7;
const SHIPS_DISTANCE = (3 * TILE_R) / 7;
const PLANET_SIZE = 60;
const ITEM_SIZE = 60;
const SHIP_SIZE = 60;
const BOARD_W = 1300;
const BOARD_H = BOARD_W;

const BACKGROUNDS = {
  empty: tileEmpty,
  blue: tileBlue,
  red: tileRed,
  yellow: tileYellow,
  black: tileBlack,
  white: tileWhite,
  green: tileGreen,
};

export {
  TILE_W,
  UNZOOM,
  TILE_H,
  TILE_R,
  BOARD_W,
  BOARD_H,
  BACKGROUNDS,
  ITEMS_DISTANCE,
  PLANETS_DISTANCE,
  SHIPS_DISTANCE,
  PLANET_SIZE,
  ITEM_SIZE,
  SHIP_SIZE,
};

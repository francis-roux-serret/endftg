import tileEmpty from '../../images/ecl_tile_empty.png';
import tileBlue from '../../images/ecl_tile_blue.png';
import tileRed from '../../images/ecl_tile_red.png';
import tileYellow from '../../images/ecl_tile_yellow.png';
import tileBlack from '../../images/ecl_tile_black.png';
import tileWhite from '../../images/ecl_tile_white.png';
import tileGreen from '../../images/ecl_tile_green.png';

const TILE_W = 300;
const UNZOOM = 1;
const TILE_H = (TILE_W * 13) / 15;
const TILE_R = TILE_H;

const BACKGROUNDS = {
  empty: tileEmpty,
  blue: tileBlue,
  red: tileRed,
  yellow: tileYellow,
  black: tileBlack,
  white: tileWhite,
  green: tileGreen,
};

export { TILE_W, UNZOOM, TILE_H, TILE_R, BACKGROUNDS };

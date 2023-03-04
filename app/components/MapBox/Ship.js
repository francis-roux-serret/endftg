import React from 'react';
import PropTypes from 'prop-types';
import imgAncientGray from '../../images/ecl_ancient_gray.png';
import imgGuardianGray from '../../images/ecl_guardian_gray.png';
import imgCenterGray from '../../images/ecl_center_gray.png';
import imgScoutBlue from '../../images/ecl_scout_blue.png';
import imgCruisBlue from '../../images/ecl_cruis_blue.png';
import imgDreadBlue from '../../images/ecl_dread_blue.png';
import imgStarbBlue from '../../images/ecl_starb_blue.png';
import imgScoutRed from '../../images/ecl_scout_red.png';
import imgCruisRed from '../../images/ecl_cruis_red.png';
import imgDreadRed from '../../images/ecl_dread_red.png';
import imgStarbRed from '../../images/ecl_starb_red.png';
import imgScoutYellow from '../../images/ecl_scout_yellow.png';
import imgCruisYellow from '../../images/ecl_cruis_yellow.png';
import imgDreadYellow from '../../images/ecl_dread_yellow.png';
import imgStarbYellow from '../../images/ecl_starb_yellow.png';
import imgScoutWhite from '../../images/ecl_scout_white.png';
import imgCruisWhite from '../../images/ecl_cruis_white.png';
import imgDreadWhite from '../../images/ecl_dread_white.png';
import imgStarbWhite from '../../images/ecl_starb_white.png';
import imgScoutBlack from '../../images/ecl_scout_black.png';
import imgCruisBlack from '../../images/ecl_cruis_black.png';
import imgDreadBlack from '../../images/ecl_dread_black.png';
import imgStarbBlack from '../../images/ecl_starb_black.png';
import imgScoutGreen from '../../images/ecl_scout_green.png';
import imgCruisGreen from '../../images/ecl_cruis_green.png';
import imgDreadGreen from '../../images/ecl_dread_green.png';
import imgStarbGreen from '../../images/ecl_starb_green.png';
import { SHIP_SIZE } from './constants';

const mapping = {
  ancientGray: imgAncientGray,
  guardianGray: imgGuardianGray,
  centerGray: imgCenterGray,
  interceptorBlue: imgScoutBlue,
  cruiserBlue: imgCruisBlue,
  dreadnoughtBlue: imgDreadBlue,
  starbaseBlue: imgStarbBlue,
  interceptorRed: imgScoutRed,
  cruiserRed: imgCruisRed,
  dreadnoughtRed: imgDreadRed,
  starbaseRed: imgStarbRed,
  interceptorYellow: imgScoutYellow,
  cruiserYellow: imgCruisYellow,
  dreadnoughtYellow: imgDreadYellow,
  starbaseYellow: imgStarbYellow,
  interceptorWhite: imgScoutWhite,
  cruiserWhite: imgCruisWhite,
  dreadnoughtWhite: imgDreadWhite,
  starbaseWhite: imgStarbWhite,
  interceptorBlack: imgScoutBlack,
  cruiserBlack: imgCruisBlack,
  dreadnoughtBlack: imgDreadBlack,
  starbaseBlack: imgStarbBlack,
  interceptorGreen: imgScoutGreen,
  cruiserGreen: imgCruisGreen,
  dreadnoughtGreen: imgDreadGreen,
  starbaseGreen: imgStarbGreen,
};

function Ship({ ship }) {
  const { type, color } = ship;
  const realColor = color ? color.charAt(0).toUpperCase() + color.slice(1) : 'Gray';
  const name = `${type}${realColor}`;

  return (
    <div>
      <img
        draggable="false"
        src={mapping[name]}
        alt={`${type} ${color}`}
        width={SHIP_SIZE}
      />
    </div>
  );
}

Ship.propTypes = {
  ship: PropTypes.object.isRequired,
};

export default Ship;

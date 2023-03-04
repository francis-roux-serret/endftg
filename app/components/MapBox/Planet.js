import React from 'react';
import PropTypes from 'prop-types';

import imgSNOff from '../../images/ecl_plan_S_off.png';
import imgSNOn from '../../images/ecl_plan_S_on.png';
import imgSAOff from '../../images/ecl_plan_S+_off.png';
import imgSAOn from '../../images/ecl_plan_S+_on.png';
import imgMNOff from '../../images/ecl_plan_M_off.png';
import imgMNOn from '../../images/ecl_plan_M_on.png';
import imgMAOff from '../../images/ecl_plan_M+_off.png';
import imgMAOn from '../../images/ecl_plan_M+_on.png';
import imgGNOff from '../../images/ecl_plan_G_off.png';
import imgGNOn from '../../images/ecl_plan_G_on.png';
import imgGAOff from '../../images/ecl_plan_G+_off.png';
import imgGAOn from '../../images/ecl_plan_G+_on.png';
import imgANOff from '../../images/ecl_plan_A_off.png';
import imgANOn from '../../images/ecl_plan_A_on.png';
import imgAAOff from '../../images/ecl_plan_A+_off.png';
import imgAAOn from '../../images/ecl_plan_A+_on.png';
import { PLANET_SIZE } from './constants';

const mapping = {
  SOff: imgSNOff,
  SOn: imgSNOn,
  SAOff: imgSAOff,
  SAOn: imgSAOn,
  MOff: imgMNOff,
  MOn: imgMNOn,
  MAOff: imgMAOff,
  MAOn: imgMAOn,
  GOff: imgGNOff,
  GOn: imgGNOn,
  GAOff: imgGAOff,
  GAOn: imgGAOn,
  AOff: imgANOff,
  AOn: imgANOn,
  AAOff: imgAAOff,
  AAOn: imgAAOn,
};

function Planet({ planet }) {
  const { type, hasColon } = planet;
  const name = `${type.replace('+', 'A')}${hasColon ? 'On' : 'Off'}`;

  return (
    <div>
      <img
        draggable="false"
        src={mapping[name]}
        alt={`${type}_${hasColon ? ' colonized' : 'free'}`}
        width={PLANET_SIZE}
      />
    </div>
  );
}

Planet.propTypes = {
  planet: PropTypes.object.isRequired,
};

export default Planet;

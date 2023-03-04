import React from 'react';
import PropTypes from 'prop-types';

import orbitalOff from '../../../images/ecl_orbital_off.png';
import orbitalOn from '../../../images/ecl_orbital_on.png';
import { ITEM_SIZE } from '../constants';

function Artefact({ item }) {
  return (
    <div>
      <img
        draggable="false"
        src={item.hasColon ? orbitalOn : orbitalOff}
        alt={`${item.hasColon ? ' colonized' : 'free'}`}
        width={ITEM_SIZE}
      />
    </div>
  );
}

Artefact.propTypes = {
  item: PropTypes.object.isRequired,
};

export default Artefact;

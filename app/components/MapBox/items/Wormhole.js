import React from 'react';

import wormhole from '../../../images/ecl_wormhole.png';
import { ITEM_SIZE } from '../constants';

function Wormhole() {
  return (
    <div>
      <img draggable="false" src={wormhole} alt="Wormhole" width={ITEM_SIZE} />
    </div>
  );
}
export default Wormhole;

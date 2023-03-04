import React from 'react';

import monolith from '../../../images/ecl_monolith.png';
import { ITEM_SIZE } from '../constants';

function Monolith() {
  return (
    <div>
      <img draggable="false" src={monolith} alt="Monolith" width={ITEM_SIZE} />
    </div>
  );
}
export default Monolith;

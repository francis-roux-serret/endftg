import React from 'react';

import artefact from '../../../images/ecl_artefact.png';
import { ITEM_SIZE } from '../constants';

function Artefact() {
  return (
    <div>
      <img draggable="false" src={artefact} alt="Artefact" width={ITEM_SIZE} />
    </div>
  );
}
export default Artefact;

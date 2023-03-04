import React from 'react';

import gift from '../../../images/ecl_gift.png';
import { ITEM_SIZE } from '../constants';

function Gift() {
  return (
    <div>
      <img draggable="false" src={gift} alt="Gift" width={ITEM_SIZE} />
    </div>
  );
}
export default Gift;

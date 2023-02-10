/**
 *
 * HalfWarpGate
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import warpImg from '../../images/ecl_half_warp.png';

function HalfWarpGate(props) {
  const { angle } = props;
  return (
    <img
      src={warpImg}
      alt="warp"
      style={{
        transform: `rotate(${angle})`,
      }}
    />
  );
}

HalfWarpGate.propTypes = {
  angle: PropTypes.number.isRequired,
};

export default HalfWarpGate;

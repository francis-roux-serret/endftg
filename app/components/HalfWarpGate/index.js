/**
 *
 * HalfWarpGate
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import warpImg from '../../images/ecl_half_warp.png';

const Wrapper = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
`;

function HalfWarpGate(props) {
  const { angle } = props;
  return (
    <Wrapper>
      <img
        draggable="false"
        src={warpImg}
        alt="warp"
        style={{
          transform: `rotate(${Math.PI / 2 - angle}rad) scale(50%)`,
        }}
      />
    </Wrapper>
  );
}

HalfWarpGate.propTypes = {
  angle: PropTypes.number.isRequired,
};

export default HalfWarpGate;

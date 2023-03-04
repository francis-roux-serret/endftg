import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TILE_H, TILE_W } from './constants';

const Wrapper = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  color: red;
  width: 40px;
  height: 40px;
  font-family: 'Courier New', monospace;
  font-size: 32px;
  font-weight: bolder;
  padding-left: 8px;
  padding-top: 0px;
  border: 3px solid red;
  border-radius: 50%;
  background-color: yellow;
`;

function VPBadge({ vp }) {
  const x = TILE_W / 2;
  const y = TILE_H / 2;

  return <Wrapper style={{ marginLeft: x, marginTop: y }}>{vp}</Wrapper>;
}

VPBadge.propTypes = {
  vp: PropTypes.number.isRequired,
};

export default VPBadge;

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { TILE_H, TILE_W } from './constants';

const Wrapper = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
`;

function Positionner({ index, count, distance, children }) {
  const angle = (index * Math.PI * 2) / count;
  const x = Math.cos(angle) * distance + TILE_W / 2;
  const y = Math.sin(angle) * distance + TILE_H / 2;

  return <Wrapper style={{ marginLeft: x, marginTop: y }}>{children}</Wrapper>;
}

Positionner.propTypes = {
  children: PropTypes.element.isRequired,
  index: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  distance: PropTypes.number.isRequired,
};

export default Positionner;

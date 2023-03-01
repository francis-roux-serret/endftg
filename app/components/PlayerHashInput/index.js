import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function PlayerHashInput(props) {
  const [text, setText] = useState('');
  const { onChange } = props;

  const handleChange = e => {
    setText(e.target.value);
  };

  const handleGo = () => {
    if (text.length === 6) {
      onChange(text);
    }
  };

  const handleKeyUp = e => {
    if (e.key === 'Enter') {
      handleGo();
    }
  };

  return (
    <div>
      <FormattedMessage {...messages.header} />
      <input
        type="text"
        maxLength={6}
        value={text}
        onKeyUp={handleKeyUp}
        onChange={handleChange}
      />
      <button onClick={handleGo}>Go</button>
    </div>
  );
}

PlayerHashInput.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default PlayerHashInput;

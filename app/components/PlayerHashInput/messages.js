/*
 * PlayerHashInput Messages
 *
 * This contains all the text for the PlayerHashInput component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.PlayerHashInput';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage:
      'Join an existing starting game : input your player hash here',
  },
});

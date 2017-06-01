// @flow
import React, { PropTypes } from 'react';

import OuterWrapper from './OuterWrapper';
import Wrapper from './Wrapper';

const RootLayout: Function = (): React$Element<*> => (
  <Wrapper id="root" />
);

export default RootLayout;
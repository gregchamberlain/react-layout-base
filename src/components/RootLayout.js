// @flow
import React from 'react';

import Wrapper from './Wrapper';
import LayoutState from '../model/LayoutState';

const RootLayout: Function = (): React$Element<*> => (
  <Wrapper id={LayoutState.ROOT_KEY} />
);

export default RootLayout;
// @flow
import React from 'react';
import PropTypes from 'prop-types';

import LayoutProvider from './components/LayoutProvider';
import RootLayout from './components/RootLayout';
import LayoutState from './model/LayoutState';

type Props = {
  layoutState: LayoutState,
  components: Object,
  plugins: ?Array<Object>,
};

const Layout = ({ style, ...props}: Props) => (
  <LayoutProvider {...props}>
    <RootLayout style={style} />
  </LayoutProvider>
);

Layout.propTypes = {
  layoutState: PropTypes.instanceOf(LayoutState).isRequired,
  components: PropTypes.object,
  plugins: PropTypes.array,
};

export default Layout;
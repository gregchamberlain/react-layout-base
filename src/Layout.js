// @flow
import React, { PropTypes } from 'react';

import Provider from './components/Provider';
import RootLayout from './components/RootLayout';
import LayoutState from './model/LayoutState';

type Props = {
  layoutState: LayoutState,
  onChange: () => void,
  components: Object,
  plugins: ?Array<Object>,
  style: ?Object
};

const Layout = ({ style, ...props}: Props) => (
  <Provider {...props}>
    <RootLayout style={style} />
  </Provider>
);

Layout.propTypes = {
  layoutState: PropTypes.instanceOf(LayoutState).isRequired,
  onChange: PropTypes.func,
  components: PropTypes.object.isRequired,
  plugins: PropTypes.array,
  style: PropTypes.object
};

export default Layout;
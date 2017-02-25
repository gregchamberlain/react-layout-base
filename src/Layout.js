// @flow
import React, { PropTypes } from 'react';

import Provider from './components/Provider';
import OuterWrapper from './components/OuterWrapper';
import LayoutState from './model/LayoutState';

type Props = {
  layoutState: LayoutState,
  onChange: ?() => void,
  components: Object,
  plugins: ?Array<Object>
};

const Layout = (props: Props) => (
  <Provider {...props}>
    <OuterWrapper id="root" />
  </Provider>
);

Layout.propTypes = {
  layoutState: PropTypes.instanceOf(LayoutState).isRequired,
  onChange: PropTypes.func,
  components: PropTypes.object.isRequired,
  plugins: PropTypes.array
};

export default Layout;
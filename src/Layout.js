// @flow
import React, { PropTypes } from 'react';

import Provider from './components/Provider';
import PluginManager from './components/PluginManager';
import OuterWrapper from './components/OuterWrapper';
import LayoutState from './model/LayoutState';

type Props = {
  layoutState: LayoutState,
  onChange: ?() => void,
  components: Object,
  plugins: ?Array<Object>,
  style: ?Object
};

const Layout = ({ style, ...props}: Props) => (
  <Provider {...props}>
    <PluginManager style={style}>
      <OuterWrapper id="root" />
    </PluginManager>
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
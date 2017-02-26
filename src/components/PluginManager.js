// @flow
import React, { PropTypes } from 'react';

import withStore from '../store/withStore';

type Props = {
  RootProvider: Function,
  children: any,
  plugins: Array<Object>,
  style: ?Object
}

const PluginProvider: Function = ({ RootProvider, children, plugins, style }: Props): React$Element<*> => (
  <RootProvider>
    <div style={style}>
      {children}
      {plugins.map(plugin => plugin.Component ? (
        <plugin.Component key={plugin} />
      ) : null )}
    </div>
  </RootProvider>
);

PluginProvider.propTypes = {
  RootProvider: PropTypes.func.isRequired
}

export default withStore('RootProvider', 'plugins')(PluginProvider);
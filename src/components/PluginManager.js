// @flow
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

type Props = {
  RootProvider: Function,
  children: any,
  plugins: Array<Object>,
  style: ?Object
}

const PluginProvider: Function = ({ RootProvider, children, plugins = [], style }: Props): React$Element<*> => (
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

const mapStateToProps = ({ layoutExtras }) => ({
  RootProvider: layoutExtras.RootProvider,
  plugins: layoutExtras.plugins
});

export default connect(mapStateToProps)(PluginProvider);
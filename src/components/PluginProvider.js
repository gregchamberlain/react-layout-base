// @flow
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

type Props = {
  RootProvider: Function,
  plugins: Array<Object>,
  style: ?Object,
  children: Array<any> | any,
}

const PluginProvider: Function = ({ RootProvider, plugins, style, children, ...props }: Props) => (
  <RootProvider {...props}>
    <div style={style}>
      {children}
      { plugins.map(plugin => plugin.Component ? (
        <plugin.Component key={plugin.Name} />
      ) : null )}
    </div>
  </RootProvider>
);

PluginProvider.propTypes = {
  RootProvider: PropTypes.func.isRequired,
  plugins: PropTypes.array.isRequired,
  style: PropTypes.object,
};

const mapStateToProps = ({ layoutExtras }) => ({
  RootProvider: layoutExtras.RootProvider,
  plugins: layoutExtras.plugins
});

export default connect(mapStateToProps)(PluginProvider);
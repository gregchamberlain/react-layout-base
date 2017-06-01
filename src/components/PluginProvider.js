// @flow
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

type Props = {
  RootProvider: Function
}

const PluginProvider: Function = ({ RootProvider, ...props }: Props) => (
  <RootProvider {...props} />
);

PluginProvider.propTypes = {
  RootProvider: PropTypes.func.isRequired
};

const mapStateToProps = ({ layoutExtras }) => ({
  RootProvider: layoutExtras.RootProvider
});

export default connect(mapStateToProps)(PluginProvider);
// @flow
import React, { PropTypes } from 'react';
import connectLayout from '../utils/connectLayout';

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

export default connectLayout(mapStateToProps)(PluginProvider);
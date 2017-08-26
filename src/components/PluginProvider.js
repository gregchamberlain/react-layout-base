// @flow
import React from 'react';
import PropTypes from 'prop-types';
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

const mapStateToProps = ({ RootProvider }) => ({
  RootProvider
});

export default connectLayout(mapStateToProps)(PluginProvider);
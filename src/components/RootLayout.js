// @flow
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import OuterWrapper from './OuterWrapper';

type Props = {
  RootProvider: Function,
  plugins: Array<Object>,
  style: ?Object
}

const RootLayout: Function = ({ RootProvider, plugins = [], style }: Props): React$Element<*> => (
  <RootProvider>
    <div style={style}>
      <OuterWrapper id="root" />
      {plugins.map(plugin => plugin.Component ? (
        <plugin.Component key={plugin} />
      ) : null )}
    </div>
  </RootProvider>
);

RootLayout.propTypes = {
  RootProvider: PropTypes.func.isRequired,
  plugins: PropTypes.array.isRequired,
  style: PropTypes.object
}

const mapStateToProps = ({ layoutExtras }) => ({
  RootProvider: layoutExtras.RootProvider,
  plugins: layoutExtras.plugins
});

export default connect(mapStateToProps)(RootLayout);
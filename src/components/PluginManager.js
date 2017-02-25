import React, { PureComponent, PropTypes } from 'react';

import withStore from '../store/withStore';

class PluginManager extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      provider: ({ children }) => children
    };
  }

  componentWillMount() {
    this.applyPlugns(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.plugins !== this.props.plugins) {
      this.applyPlugns(nextProps);
    }
  }

  applyPlugns = (props) => {
    let provider = ({ children }) => children;
    props.plugins.forEach(plugin => {
      if (plugin.Provider) provider = plugin.Provider(provider);
    });
    provider.displayName = 'RootProvider';
    this.setState({ provider });
  }

  render() {
    const WrappedProvider = this.state.provider;
    return (
      <WrappedProvider>
        {React.Children.only(this.props.children)}
      </WrappedProvider>
    );
  }

}

PluginManager.propTypes = {
  children: PropTypes.element,
  plugins: PropTypes.array.isRequired
}

export default withStore('plugins')(PluginManager);
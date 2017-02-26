// @flow
import React, { PureComponent, PropTypes } from 'react';

import LayoutState from '../model/LayoutState';
import Store from '../store/Store';
import InnerWrapper from './InnerWrapper';
import shallowCompare from '../utils/shallowCompare';

type Props = {
  layoutState: LayoutState,
  onChange: () => void,
  components: Object,
  plugins: Array<Object>,
  readOnly: ?boolean,
  children: Array<Object>
}

class LayoutProvider extends PureComponent {

  static defaultProps: Object
  props: Props
  store: Store

  constructor(props: Props) {
    super(props);
    props.layoutState.setOnChangeListener(props.onChange);
    this.store = new Store({
      layoutState: props.layoutState,
      components: props.components,
      plugins: props.plugins,
      readOnly: props.readOnly
    });
    this.applyPlugins(props);
  }

  applyPlugins = (props: Props) => {
    console.log('Creating Root Wrapper...');
    // Constructing the RootWrapper
    let RootWrapper = InnerWrapper;
    let RootProvider = ({ children }) => children;
    props.plugins.forEach(plugin => {
      if (plugin.Wrapper) RootWrapper = plugin.Wrapper(RootWrapper);
      if (plugin.Provider) RootProvider = plugin.Provider(RootProvider, this.store);
    });
    this.store.update('RootWrapper', RootWrapper);
    this.store.update('RootProvider', RootProvider);
    // Constructing the RootProvider
  }

  getChildContext() {
    return {
      layoutStore: this.store
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    const watched = ['components', 'readOnly'];
    if (nextProps.layoutState !== this.props.layoutState) {
      nextProps.layoutState.setOnChangeListener(nextProps.onChange);
      this.store.update('layoutState', nextProps.layoutState);
    }
    if (!shallowCompare(nextProps.plugins, this.props.plugins)) {
      this.applyPlugins(nextProps);
    }
    watched.forEach(key => {
      if (!shallowCompare(nextProps[key], this.props[key])) this.store.update(key, nextProps[key]);
    });
  }

  render() {
    return React.Children.only(this.props.children);
  }

}

LayoutProvider.childContextTypes = {
  layoutStore: PropTypes.instanceOf(Store)
};

LayoutProvider.propTypes = {
  layoutState: PropTypes.instanceOf(LayoutState).isRequired,
  onChange: PropTypes.func.isRequired,
  components: PropTypes.object.isRequired,
  plugins: PropTypes.array,
  readOnly: PropTypes.bool,
  children: PropTypes.element
};

LayoutProvider.defaultProps = {
  plugins: [],
  onChange: () => {}
};

export default LayoutProvider;

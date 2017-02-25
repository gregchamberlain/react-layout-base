// @flow
import React, { PureComponent, PropTypes } from 'react';

import LayoutState from '../model/LayoutState';
import Store from '../store/Store';

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
  }

  getChildContext() {
    return {
      store: this.store
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    const watched = ['components', 'plugins', 'readOnly'];
    if (nextProps.layoutState !== this.props.layoutState) {
      nextProps.layoutState.setOnChangeListener(nextProps.onChange);
      this.store.update('layoutState', nextProps.layoutState);
    }
    watched.forEach(key => {
      if (nextProps[key] !== this.props[key]) this.store.update(key, nextProps[key]);
    });
  }

  render() {
    return React.Children.only(this.props.children);
  }

}

LayoutProvider.childContextTypes = {
  store: PropTypes.instanceOf(Store)
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
  plugins: []
};

export default LayoutProvider;

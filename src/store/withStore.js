// @flow
import React, { PureComponent, PropTypes } from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';

import Store from '../store/Store';

const getDisplayName = (WrappedComponent: ReactClass<*>): string => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}


type Context = {
  store: Store
};

const withStore = (...items: Array<string>) => (WrappedComponent: ReactClass<*>) => {

  class WithStore extends PureComponent {

    state: Object
    context: Context

    constructor(props: Object, context: Context) {
      super(props, context);
      this.state = context.store.subscribe(items, this.updateState);
    }

    componentWillUnmount() {
      this.context.store.unsubscribe(items, this.updateState);
    }

    updateState = (key: string, value: any): void => {
      this.setState({ [key]: value });
    }

    render() {
      return <WrappedComponent {...this.props} {...this.state} />
    }

  }

  WithStore.displayName = `WithStore(${getDisplayName(WrappedComponent)})`;
  hoistNonReactStatic(WithStore, WrappedComponent);

  WithStore.contextTypes = {
    store: PropTypes.instanceOf(Store)
  };

  return WithStore;

}

export default withStore;
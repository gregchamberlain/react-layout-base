// @flow
import React, { PureComponent, PropTypes } from 'react';
import { Provider } from 'react-redux';

import configureStore, { injectReducers, createMiddleware } from '../redux';
import LayoutState from '../model/LayoutState';
import { setLayoutState, setExtra } from '../actions';
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
  store: any

  constructor(props: Props) {
    super(props);
    const { RootProvider, RootWrapper, reducers, middlewares } = this.applyPlugins(props);
    const { MasterMiddleware, injectMiddlewares } = createMiddleware(middlewares);
    this.store = configureStore(reducers, {
      layoutState: props.layoutState,
      nextLayoutState: props.layoutState,
      layoutExtras: {
        plugins: props.plugins,
        components: props.components,
        readOnly: props.readOnly,
        RootProvider,
        RootWrapper
      }
    }, MasterMiddleware);
    this.store.injectMiddlewares = injectMiddlewares;
    this.store.subscribe(this.onStoreChange);
  }

  onStoreChange = () => {
    const state = this.store.getState();
    if (state.layoutState !== state.nextLayoutState) {
      this.props.onChange(state.nextLayoutState);
    }
  }

  applyPlugins = (props: Props): Object => {
    let RootWrapper = InnerWrapper;
    let RootProvider = ({ children }: { children: any }) => children;
    let reducers = {};
    let middlewares = [];
    props.plugins.forEach(plugin => {
      if (plugin.Wrapper) RootWrapper = plugin.Wrapper(RootWrapper);
      if (plugin.Provider) RootProvider = plugin.Provider(RootProvider, this.store);
      if (plugin.reducer) reducers[plugin.Name] = plugin.reducer;
      if (plugin.middleware) middlewares.push(plugin.middleware);
    });
    return {
      RootWrapper,
      RootProvider,
      reducers,
      middlewares
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    const watched = ['components', 'readOnly'];
    if (nextProps.layoutState !== this.props.layoutState) {
      this.store.dispatch(setLayoutState(nextProps.layoutState));
    }
    if (!shallowCompare(nextProps.plugins, this.props.plugins)) {
      const { RootWrapper, RootProvider, reducers, middlewares } = this.applyPlugins(nextProps);
      this.store.dispatch(setExtra('RootProvider', RootProvider));
      this.store.dispatch(setExtra('RootWrapper', RootWrapper));
      injectReducers(this.store, reducers);
      this.store.injectMiddlewares(middlewares);
    }
    watched.forEach(key => {
      if (!shallowCompare(nextProps[key], this.props[key])) this.store.dispatch(setExtra(key, nextProps[key]));
    });
  }

  render() {
    return (
      <Provider store={this.store}>
        {React.Children.only(this.props.children)}
      </Provider>
    );
  }

}

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

// @flow
import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';

import configureStore, { injectReducers, createMiddleware } from '../redux';
import LayoutState from '../model/LayoutState';
import PluginProvider from './PluginProvider';
import { setLayoutState, setExtra } from '../actions';
import shallowCompare from '../utils/shallowCompare';
import processPlugins from '../utils/processPlugins';
import ensureDependencies from '../utils/ensureDependencies';
import WrapperCache from '../utils/WrapperCache';

const Component = React.PureComponent || React.Component;

type Props = {
  layoutState: LayoutState,
  onChange: () => void,
  components: Object,
  plugins: Array<Function>,
  readOnly: ?boolean,
  children: Array<Object>
}

class LayoutProvider extends Component {

  static defaultProps: Object
  props: Props
  store: any

  constructor(props: Props) {
    super(props);
    const { RootProvider, wrappers, reducers, middlewares } = processPlugins(props);
    this.store = configureStore(reducers, {
      layoutState: props.layoutState,
      nextLayoutState: props.layoutState,
      layoutExtras: {
        plugins: props.plugins.map(plugin => plugin(props)),
        components: props.components,
        wrapperCache: new WrapperCache(props.components, wrappers),
        readOnly: props.readOnly,
        RootProvider
      }
    }, middlewares);
  }

  componentWillReceiveProps(nextProps: Props) {
    const watched = ['readOnly'];
    if (nextProps.layoutState !== this.props.layoutState) {
      this.store.dispatch(setLayoutState(nextProps.layoutState));
    }
    if (!shallowCompare(nextProps.plugins, this.props.plugins)) {
      const { RootProvider, wrappers, reducers, middlewares, plugins } = processPlugins(nextProps);
      this.store.dispatch(setExtra({
        plugins,
        wrapperCache: new WrapperCache(nextProps.components, wrappers),
        RootProvider
      }));
      this.store.injectReducers(reducers);
      this.store.injectMiddlewares(middlewares);
    }
    if (!shallowCompare(nextProps.components, this.props.components)) {
      const { wrappers } = processPlugins(nextProps);
      this.store.dispatch(setExtra({
        wrapperCache: new WrapperCache(nextProps.components, wrappers),
        components: nextProps.components
      }));
    }
    watched.forEach(key => {
      if (!shallowCompare(nextProps[key], this.props[key])) this.store.dispatch(setExtra({ [key]: nextProps[key] }));
    });
  }

  render() {
    return (
      <Provider store={this.store}>
        <PluginProvider {...this.props} />
      </Provider>
    );
  }

}

LayoutProvider.propTypes = {
  layoutState: PropTypes.instanceOf(LayoutState).isRequired,
  components: PropTypes.object,
  plugins: PropTypes.array,
};

LayoutProvider.defaultProps = {
  plugins: [],
  components: {}
};

export default LayoutProvider;

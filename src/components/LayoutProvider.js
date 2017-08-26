// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { createProvider } from 'react-redux';

const Provider = createProvider('layoutStore');

import configureStore, { injectReducers, createMiddleware } from '../redux';
import LayoutState from '../model/LayoutState';
import PluginProvider from './PluginProvider';
import { setLayoutState, setExtra } from '../actions';
import { setState } from '../redux/actions';
import shallowCompare from '../utils/shallowCompare';
import processPlugins from '../utils/processPlugins';
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
    const { RootProvider, wrappers } = processPlugins(props);
    this.store = configureStore({
      layoutState: props.layoutState,
      onChange: props.onChange,
      plugins: props.plugins,
      components: props.components,
      wrapperCache: new WrapperCache(props.components, wrappers),
      RootProvider
    });
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.layoutState !== this.props.layoutState) {
      this.store.dispatch(setState({ layoutState: nextProps.layoutState }));
    }
    if (!shallowCompare(nextProps.plugins, this.props.plugins)) {
      const { RootProvider, wrappers, plugins } = processPlugins(nextProps);
      this.store.dispatch(setState({
        plugins,
        wrapperCache: new WrapperCache(nextProps.components, wrappers),
        RootProvider
      }));
    }
    if (!shallowCompare(nextProps.components, this.props.components)) {
      const { wrappers } = processPlugins(nextProps);
      this.store.dispatch(setState({
        wrapperCache: new WrapperCache(nextProps.components, wrappers),
        components: nextProps.components
      }));
    }
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

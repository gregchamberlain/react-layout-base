// @flow
import InnerWrapper from '../components/InnerWrapper';
import React from 'react';

type Props = {
  plugins: Array<Function>
};

type Plugin = {
  Name: string,
  Provider: ?Function,
  Wrapper: ?Function,
  Component: ?Function,
  reducer: ?Function,
  middleware: ?Function,
}

const processPlugins = (props: Props): Object => {
  let RootWrapper = InnerWrapper;
  let RootProvider = ({ children }) => React.Children.only(children);
  let reducers = {};
  let middlewares = [];
  let names = new Set();
  props.plugins.forEach((pluginFactory, idx) => {
    const plugin = pluginFactory(props);
    if (names.has(plugin.Name)) {
      console.error(`Plugin name conflict. More than one plugin with the name "${plugin.Name}". Ensure you are not using multiple copies of one plugin.`);
    } else {
      names.add(plugin.Name);
    }
    if (plugin.Wrapper) RootWrapper = plugin.Wrapper(RootWrapper);
    if (plugin.Provider) RootProvider = plugin.Provider(RootProvider);
    if (plugin.reducer) reducers[plugin.Name] = plugin.reducer;
    if (plugin.middleware) middlewares.push(plugin.middleware);
  });
  return {
    RootWrapper,
    RootProvider,
    reducers,
    middlewares
  };
};

export default processPlugins;
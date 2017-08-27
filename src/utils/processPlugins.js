// @flow
import React from 'react';
import shallowCompare from './shallowCompare';

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
  let RootProvider = ({ children }) => React.Children.only(children);
  let wrappers = [];
  let plugins = [];
  let names = new Set();
  props.plugins.forEach((plugin, idx) => {
    plugins.push(plugin)
    if (names.has(plugin.Name)) {
      console.error(`Plugin name conflict. More than one plugin with the name "${plugin.Name}". Ensure you are not using multiple copies of one plugin.`);
    } else {
      names.add(plugin.Name);
    }
    if (plugin.Wrapper) wrappers.push(plugin.Wrapper);
    if (plugin.Provider) RootProvider = plugin.Provider(RootProvider);
  });
  return {
    RootProvider,
    wrappers,
    plugins
  };
};

export default processPlugins;
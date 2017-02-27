import React from 'react';
import { findDOMNode } from 'react-dom';
import hoistNonReactStatic from 'hoist-non-react-statics';

const Wrapper = WrappedComponent => {
  const StyleWrapper = ({ pseudoRef, ...props }) => <WrappedComponent {...props} pseudoRef={instance => {
    const node = findDOMNode(instance);
    if (node) node.style.outline = '1px solid #35b5e5';
    pseudoRef(instance);
  }} />;
  hoistNonReactStatic(StyleWrapper, WrappedComponent);
  return StyleWrapper;
};

export default Wrapper;
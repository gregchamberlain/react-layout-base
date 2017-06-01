import React, { Component } from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';

const Wrapper = WrappedComponent => {

  class ClassWrapper extends Component {
    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  const RefWrapper = ({ pseudoRef, dispatch, ...props }) => (
    <ClassWrapper
      {...props}
      ref={instance => (typeof pseudoRef === 'function') && pseudoRef(instance)}
    />
  )

  hoistNonReactStatic(RefWrapper, WrappedComponent);
  return RefWrapper;

}

export default Wrapper;
// @flow
import React, { PureComponent } from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';

const Wrapper: ReactClass<*> = (WrappedComponent: ReactClass<*>, displayName: string) => {

  const InnerWrapper: ReactClass<*> = ({ pseudoRef, ...props }) => {

    class ClassWrapper extends PureComponent {
      render() {
        return <WrappedComponent {...this.props} />
      }
    }

    ClassWrapper.displayName = `ClassWrapper(${displayName})`;

    return <ClassWrapper {...props} ref={instance => pseudoRef(instance)} />

  }

  InnerWrapper.displayName = `InnerWrapper(${displayName})`;
  hoistNonReactStatic(InnerWrapper, WrappedComponent);

  return InnerWrapper;

};

export default Wrapper;
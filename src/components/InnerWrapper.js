import React, { PureComponent, PropTypes } from 'react';

class ClassWrapper extends PureComponent {
  render() {
    const { children, ...props } = this.props;
    return React.cloneElement(React.Children.only(children), props);
  }
}

ClassWrapper.propTypes = {
  children: PropTypes.element
};

const InnerWrapper = ({ pseudoRef, ...props }) => <ClassWrapper {...props} ref={instance => pseudoRef(instance)} />

export default InnerWrapper;
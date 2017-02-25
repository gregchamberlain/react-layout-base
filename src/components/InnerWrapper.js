import React, { PureComponent, PropTypes } from 'react';

class ClassWrapper extends PureComponent {
  render() {
    return React.Children.only(this.props.children);
  }
}

ClassWrapper.propTypes = {
  children: PropTypes.element
};

const InnerWrapper = ({ pseudoRef, ...props }) => <ClassWrapper {...props} ref={instance => pseudoRef(instance)} />

export default InnerWrapper;
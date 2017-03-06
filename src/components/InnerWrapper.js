import React, { PropTypes } from 'react';

const Component = React.PureComponent || React.Component;

// Wraps the Component in a React Class so refs can always be applied
class ClassWrapper extends Component {
  render() {
    const { children, dispatch, ...props } = this.props;
    return React.cloneElement(React.Children.only(children), props);
  }
}

ClassWrapper.propTypes = {
  children: PropTypes.element
};

// Calls plugin wrappers pseudoRef function to give then access to the component
const InnerWrapper = ({ pseudoRef, ...props }) => <ClassWrapper {...props} ref={instance => pseudoRef(instance)} />

export default InnerWrapper;
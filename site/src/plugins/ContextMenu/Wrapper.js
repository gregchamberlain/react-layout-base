import React, { PureComponent, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import hoistNonReactStatic from 'hoist-non-react-statics';

const Wrapper = WrappedComponent => {

  class ContextMenuWrapper extends PureComponent {

    componentDidMount() {
      if (this.node) {
        const node = findDOMNode(this.node);
        node.addEventListener('contextmenu', this.onContextMenu);
      }
    }

    componentWillUnmount() {
      if (this.node) {
        const node = findDOMNode(this.node);
        node.removeEventListener('contextmenu', this.onContextMenu);
      }
    }

    onContextMenu = e => {
      e.preventDefault();
      e.stopPropagation();
      this.context.setContextMenu(this.props.id, e);
    }

    render() {

      const { pseudoRef, ...props } = this.props;

      return (
        <WrappedComponent {...props} pseudoRef={instance => {
          this.node = instance;
          pseudoRef(instance);
        }} />
      );
    }
  }

  ContextMenuWrapper.contextTypes = {
    setContextMenu: PropTypes.func
  }

  hoistNonReactStatic(ContextMenuWrapper, WrappedComponent);
  return ContextMenuWrapper;

};

export default Wrapper;
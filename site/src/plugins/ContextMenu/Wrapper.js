import React, { PureComponent, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import hoistNonReactStatic from 'hoist-non-react-statics';

import { withStore } from '../../../../src';

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

    applyRef = instance => {
      if (instance && !this.node && instance !== this.lastNode) {
        const node = findDOMNode(instance);
        node.addEventListener('contextmenu', this.onContextMenu);
      }
      this.lastNode = this.node;
      this.node = instance;
    }

    onContextMenu = e => {
      e.preventDefault();
      e.stopPropagation();
      this.props.onContextMenu(this.props.id, e);
    }

    render() {

      const { pseudoRef, ...props } = this.props;

      return (
        <WrappedComponent {...props} pseudoRef={instance => {
          // console.log(props.id, instance);
          this.applyRef(instance);
          pseudoRef(instance);
        }} />
      );
    }
  }

  hoistNonReactStatic(ContextMenuWrapper, WrappedComponent);
  return withStore('onContextMenu')(ContextMenuWrapper);

};

export default Wrapper;
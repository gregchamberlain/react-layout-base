import React, { PureComponent, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { connect } from 'react-redux';

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
      this.props.setContextMenu({
        id: this.props.id,
        x: e.clientX,
        y: e.clientY,
      });
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
  const mapDispatchToProps = dispatch => ({
    setContextMenu: (val) => dispatch({ type: 'SET_LAYOUT_EXTRA', key: 'contextMenu', value: val })
  });
  return connect(null, mapDispatchToProps)(ContextMenuWrapper);

};

export default Wrapper;
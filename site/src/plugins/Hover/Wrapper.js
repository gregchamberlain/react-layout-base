import React, { PureComponent, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { connect } from 'react-redux';

const Wrapper = WrappedComponent => {

  class HoverWrapper extends PureComponent {

    componentDidMount() {
      if (this.node) {
        const node = findDOMNode(this.node);
        this.outline = node.style.outline;
        node.addEventListener('mouseenter', this.onMouseEnter);
        node.addEventListener('mouseleave', this.onMouseLeave);
        node.addEventListener('dragleave', this.onMouseLeave);
        node.addEventListener('dragstart', this.onMouseLeave);
      }
    }

    componentWillUnmount() {
      if (this.node) {
        const node = findDOMNode(this.node);
        node.removeEventListener('mouseenter', this.onMouseEnter);
        node.removeEventListener('mouseleave', this.onMouseLeave);
        node.removeEventListener('dragleave', this.onMouseLeave);
        node.removeEventListener('dragstart', this.onMouseLeave);
      }
    }

    applyRef = instance => {
      if (instance && !this.node && instance !== this.lastNode) {
        const node = findDOMNode(instance);
        node.addEventListener('mouseenter', this.onMouseEnter);
        node.addEventListener('mouseleave', this.onMouseLeave);
        node.addEventListener('dragleave', this.onMouseLeave);
        node.addEventListener('dragstart', this.onMouseLeave);
      }
      this.lastNode = this.node;
      this.node = instance;
    }

    onMouseEnter = e => {
      if (this.node) {
        const node = findDOMNode(this.node);
        node.style.outline = '1px solid #35b5e5';
      }
    }

    onMouseLeave = e => {
      if (this.node) {
        const node = findDOMNode(this.node);
        node.style.outline = this.outline;
      }
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

  hoistNonReactStatic(HoverWrapper, WrappedComponent);
  return HoverWrapper;

};

export default Wrapper;
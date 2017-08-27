import React, { Component } from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { findDOMNode } from 'react-dom';
import withLayoutState from '../../../../src/utils/withLayoutState';

const Wrapper = (listenerMap = {}) => (WrappedComponent, displayName) => {

  class DomWrapper extends Component {

    listeners = {}

    setNode = (node) => {
      if (node && this.node !== node) {
        this.unlisten(this.node);
        this.listen(node);
        this.node = node;
      }
    }

    getListener = (name) => {
      if (!this.listeners[name]) {
        this.listeners[name] = (e) => {
          listenerMap[name](this.props['data-id'], e);
        };
      }
      return this.listeners[name];
    }

    listen = (node) => {
      if (node) {
        Object.keys(listenerMap).forEach((key) => {
          node.addEventListener(key, this.getListener(key));
        });
      }
    }

    unlisten = (node) => {
      if (node) {
        Object.keys(listenerMap).forEach((key) => {
          node.removeEventListener(key, this.listeners[key])
        });
      }
    }

    render() {
      const { layoutState, onChange, pseudoRef, ...props } = this.props;
      return (
        <WrappedComponent
          {...props}
          pseudoRef={(instance) => {
            this.setNode(findDOMNode(instance))
            if (typeof pseudoRef === 'function') {
              pseudoRef(instance);
            }
          }}
        />
      );
    }
  }

  hoistNonReactStatic(DomWrapper, WrappedComponent);
  return withLayoutState(DomWrapper);
};

export default Wrapper;
import React, { PureComponent, PropTypes } from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';

import { withStore } from '../../../../src';

const Provider = (WrappedComponent, store) => {

  class UndoProvider extends PureComponent {

    constructor(props) {
      super(props);
      this.undoStack = [props.layoutState];
      this.redoStack = [];
    }

    componentDidMount() {
      window.addEventListener('keydown', this.keyPressHandler);
    }

    componentWillUnmount() {
      window.removeEventListener('keydown', this.keyPressHandler);
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.layoutState !== this.props.layoutState && nextProps.layoutState !== this.undoStack[this.undoStack.length - 1]) {
        console.log('adding to undo stack!');
        this.undoStack.push(nextProps.layoutState);
      }
    }

    undo = () => {
      if (this.undoStack.length > 1) {
          const layoutState = this.undoStack.pop();
          layoutState.onChange(this.undoStack[this.undoStack.length - 1])        
          this.redoStack.push(layoutState);
        }
    }

    redo = () => {
      if (this.redoStack.length) {
          const layoutState = this.undoStack[this.undoStack.length - 1];
          this.undoStack.push(this.redoStack.pop());
          layoutState.onChange(this.undoStack[this.undoStack.length - 1])        
        }
    }

    keyPressHandler = e => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'z') this.undo();
        if (e.key === 'y') this.redo();
      }
    }

    render() {
      return <WrappedComponent {...this.props} />
    }

  }

  hoistNonReactStatic(UndoProvider, WrappedComponent);
  return withStore('layoutState')(UndoProvider);

}

export default Provider;
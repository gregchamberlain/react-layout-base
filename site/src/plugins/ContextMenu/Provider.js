import React, { PureComponent, PropTypes } from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';

const Provider = (WrappedComponent, store) => {

  class ContextMenuProvider extends PureComponent {

    componentDidMount() {
      window.addEventListener('click', this.clickHandler);
      window.addEventListener('contextmenu', this.clickHandler);
    }

    componentWillUnmount() {
      window.removeEventListener('click', this.clickHandler);
      window.removeEventListener('contextmenu', this.clickHandler);
    }

    clickHandler = e => {
      store.update('contextMenu', null);
    }

    setContextMenu = (id, e) => {
      store.update('contextMenu', { id, x: e.clientX, y: e.clientY });
    }

    getChildContext() {
      return {
        setContextMenu: this.setContextMenu
      }
    }


    render() {
      return <WrappedComponent {...this.props} />
    }

  }

  ContextMenuProvider.childContextTypes = {
    setContextMenu: PropTypes.func
  };

  hoistNonReactStatic(ContextMenuProvider, WrappedComponent);
  return ContextMenuProvider;

}

export default Provider;
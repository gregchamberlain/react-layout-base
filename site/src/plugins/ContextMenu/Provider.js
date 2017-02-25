import React, { PureComponent, PropTypes } from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';

import Menu from './Menu';

const Provider = WrappedComponent => {

  class ContextMenuProvider extends PureComponent {

    constructor() {
      super();
      this.state = {
        id: null,
        x: 0,
        y: 0
      }
    }

    componentDidMount() {
      window.addEventListener('click', this.clickHandler);
      window.addEventListener('contextmenu', this.clickHandler);
    }

    componentWillUnmount() {
      window.removeEventListener('click', this.clickHandler);
      window.removeEventListener('contextmenu', this.clickHandler);
    }

    clickHandler = e => {
      this.setState({ id: null });
    }

    setContextMenu = (id, e) => {
      this.setState({ id, x: e.clientX, y: e.clientY });
    }

    getChildContext() {
      return {
        setContextMenu: this.setContextMenu
      }
    }


    render() {
      const { id, x, y } = this.state;
      return <div><WrappedComponent {...this.props} />{ id ? <Menu id={id} pos={{ x, y }} /> : null }</div>
    }

  }

  ContextMenuProvider.childContextTypes = {
    setContextMenu: PropTypes.func
  };

  hoistNonReactStatic(ContextMenuProvider, WrappedComponent);
  return ContextMenuProvider;

}

export default Provider;
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

class Menu extends PureComponent {

  componentDidMount() {
      window.addEventListener('click', this.clickHandler);
      window.addEventListener('contextmenu', this.clickHandler);
    }

    componentWillUnmount() {
      window.removeEventListener('click', this.clickHandler);
      window.removeEventListener('contextmenu', this.clickHandler);
    }

    clickHandler = e => {
      if (this.props.contextMenu) {
        this.props.updateContextMenu();
      }
    }

    render() {
      const { contextMenu, remove } = this.props
      return contextMenu ? (
        <div style={{
          position: 'absolute',
          top: contextMenu.y,
          left: contextMenu.x,
          backgroundColor: 'white',
          boxShadow: '0 0 5px #aaa'
        }}>
          <div onClick={() => remove(contextMenu.id)}  style={{ cursor: 'pointer', padding: 10 }}>Delete</div>
        </div>
      ) : null;
    }

}

const mapStateToProps = ({ layoutExtras }) => ({
  contextMenu: layoutExtras.contextMenu
});

const mapDispatchToProps = dispatch => ({
  remove: id => dispatch({ type: 'REMOVE_ITEM', id }),
  updateContextMenu: () => dispatch({ type: 'SET_LAYOUT_EXTRA', key: 'contextMenu', value: null })
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
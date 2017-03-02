import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { insertOrMoveItem } from '../../../../src/plugins/Edit/actions';

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
      const { components, contextMenu, remove, insertItem } = this.props
      return contextMenu ? (
        <div style={{
          position: 'absolute',
          top: contextMenu.y,
          left: contextMenu.x,
          backgroundColor: 'white',
          boxShadow: '0 0 5px #aaa'
        }}>
          <div onClick={() => remove(contextMenu.id)}  style={{ cursor: 'pointer', padding: 10 }}>Delete</div>
          { Object.keys(components).map(key => (
            <div style={{ cursor: 'pointer', padding: 10 }} key={key} onClick={() => insertItem(contextMenu.id, key)}>
              Insert {key}
            </div>
          ))}
        </div>
      ) : null;
    }

}

const mapStateToProps = ({ layoutExtras }) => ({
  contextMenu: layoutExtras.contextMenu,
  components: layoutExtras.components
});

const mapDispatchToProps = dispatch => ({
  remove: id => dispatch({ type: 'LAYOUT_STATE_REMOVE_ITEM', id }),
  updateContextMenu: () => dispatch({ type: 'SET_LAYOUT_EXTRA', pairs: { contextMenu: null } }),
  insertItem: (id, key) => dispatch(insertOrMoveItem(id, 0, { type: key, props: {}, children: [] }))
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
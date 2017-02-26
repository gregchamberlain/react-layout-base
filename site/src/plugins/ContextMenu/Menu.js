import React from 'react';

import { withStore } from '../../../../src';

const Menu = ({ contextMenu, layoutState }) => contextMenu ? (
  <div style={{
    position: 'absolute',
    top: contextMenu.y,
    left: contextMenu.x,
    backgroundColor: 'white',
    boxShadow: '0 0 5px #aaa'
  }}>
    <div onClick={() => layoutState.removeItem(contextMenu.id)}  style={{ cursor: 'pointer', padding: 10 }}>Delete</div>
  </div>
) : null;

export default withStore('layoutState', 'contextMenu')(Menu);
import React from 'react';

import { withStore } from '../../../../src';

const Menu = ({ id, pos, layoutState }) => (
  <div style={{
    position: 'absolute',
    top: pos.y,
    left: pos.x,
    backgroundColor: 'white',
    boxShadow: '0 0 10px #444'
  }}>
    <div onClick={() => layoutState.removeItem(id)}  style={{ cursor: 'pointer', padding: 10 }}>Delete</div>
  </div>
);

export default withStore('layoutState')(Menu);
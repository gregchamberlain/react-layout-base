import React from 'react';

import withLayoutState from '../../../../src/utils/withLayoutState';

const SelectedDisplay = ({ type, bounds, index }) => {
  return (
    <div
      style={{
        position: 'fixed',
        outline: '2px solid #35b5e5',
        outlineOffset: -2,
        zIndex: 5 + index,
        top: bounds.top,
        left: bounds.left,
        width: bounds.width,
        height: bounds.height,
        pointerEvents: 'none'
      }}
    >
      <div style={{
        backgroundColor: '#35b5e5',
        color: 'white',
        position: 'absolute',
        top: 0,
        left: 0
      }}>{type}</div>
    </div>
  );
};

export default withLayoutState(SelectedDisplay);
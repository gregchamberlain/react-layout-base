import React from 'react';

import withLayoutState from '../../../../src/utils/withLayoutState';

const HoverDisplay = ({ layoutState }) => {
  const hover = layoutState.getIn(['pluginState', 'selected']);
  if (!hover) return null;
  const type = layoutState.getIn(['itemMap', hover.key, 'type']);
  const bounds = hover.node.getBoundingClientRect();
  return (
    <div
      style={{
        position: 'fixed',
        outline: '2px solid #b535e5',
        outlineOffset: -2,
        zIndex: 10,
        top: bounds.top,
        left: bounds.left,
        width: bounds.width,
        height: bounds.height,
        pointerEvents: 'none'
      }}
    >
      <div style={{
        backgroundColor: '#b535e5',
        color: 'white',
        position: 'absolute',
        top: 0,
        left: 0
      }}>{type}</div>
    </div>
  );
};

export default withLayoutState(HoverDisplay);
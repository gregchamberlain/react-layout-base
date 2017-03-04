import React from 'react';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';

import { removeItem } from '../../../../src/plugins/Edit/actions';

const target = {
  drop(props, monitor, component) {
    if (!monitor.didDrop()) {
      props.removeItem(monitor.getItem().id);
    }
  }
};

const TrashBin = ({ connectDropTarget, ...props }) => connectDropTarget(
  <div style={style(props)}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="inherit" height="24" viewBox="0 0 24 24" width="24">
      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
      <path d="M0 0h24v24H0z" fill="none"/>
    </svg>
  </div>
);

const style = ({ canDrop, isOver }) => ({
  position: 'absolute',
  backgroundColor: isOver ? 'red' : 'grey',
  width: canDrop ? 75 : 0,
  height: canDrop ? 75 : 0,
  opacity: canDrop ? 1 : 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 28,
  color: 'white',
  transform: 'translateX(50%) translateY(50%)',
  bottom: 75,
  right: 75,
  borderRadius: '50%',
  transition: 'opacity 0.5s ease-in, backgroundColor 0.2s linear'
});

const droppable = DropTarget('Component', target, (conn, monitor) => ({
  connectDropTarget: conn.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))(TrashBin);

const mapDispatchToProps = dispatch => ({
  removeItem: id => dispatch(removeItem(id))
});

export default connect(null, mapDispatchToProps)(droppable)
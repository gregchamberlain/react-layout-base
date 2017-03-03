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

const TrashBin = ({ connectDropTarget, isOver, canDrop }) => connectDropTarget(
  <div style={{
    width: 100,
    height: 100,
    backgroundColor: canDrop ? ( isOver ? '#f44336' : '#ffcdd2' ) : '#64B5F6',
    border: '1px solid #ccc'
  }}>
    Trash Bin
  </div>
);

const droppable = DropTarget('Component', target, (conn, monitor) => ({
  connectDropTarget: conn.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))(TrashBin);

const mapDispatchToProps = dispatch => ({
  removeItem: id => dispatch(removeItem(id))
});

export default connect(null, mapDispatchToProps)(droppable)
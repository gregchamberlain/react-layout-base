import React from 'react';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import { insertOrMoveItem } from '../../../src/plugins/Edit/actions';

const target = {
  drop(props, monitor) {
    if (!monitor.didDrop()) {
      props.moveItem(props.id, 0, monitor.getItem())
    }
  }
}

const Column = ({ children, connectDropTarget, isOverCurrent, backgroundColor }) => connectDropTarget(
  <div style={{
    minHeight: 30,
    border: '1px solid #aaa',
    backgroundColor: isOverCurrent ? '#35b5e5' : backgroundColor,
    padding: 10
  }}>
    {children}
  </div>
);

const mapDispatchToProps = dispatch => ({
  moveItem: (parentId, idx, item) => dispatch(insertOrMoveItem(parentId, idx, item))
});

const droppable = DropTarget('Component', target, (conn, monitor) => ({
  connectDropTarget: conn.dropTarget(),
  isOverCurrent: monitor.isOver({ shallow: true })
}))(Column);

export default connect(null, mapDispatchToProps)(droppable);
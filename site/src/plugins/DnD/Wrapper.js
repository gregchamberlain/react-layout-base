import React from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource } from 'react-dnd';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { connect } from 'react-redux';

const source = {
  beginDrag(props) {
    return props.layoutState.getItem(props.id);
  }
};

const DnDWrapper = (WrappedComponent, displayName) => {

  const DnD = ({ connectDragSource, isDragging, layoutState, pseudoRef, ...props }) => isDragging ? null : (
    <WrappedComponent {...props} pseudoRef={instance => {
      if (props.id !== 'root') connectDragSource(findDOMNode(instance));
      pseudoRef(instance);
    }} />
  )

  DnD.displayName = `DnDWrapper(${displayName})`
  hoistNonReactStatic(DnD, WrappedComponent);

  const mapStateToProps = ({ layoutState }) => ({ layoutState });

  return connect(mapStateToProps)(DragSource('Component', source, (conn, monitor) => ({
    connectDragSource: conn.dragSource(),
    isDragging: monitor.isDragging()
  }))(DnD))

};

export default DnDWrapper;
import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { insertOrMoveItem } from '../../../../src/plugins/Edit/actions';
import { connect } from 'react-redux';

const source = {
  beginDrag(props) {
    return props.layoutState.getItem(props.id);
  }
};

const target = {
  drop(props, monitor) {
    if (!monitor.didDrop()) {
      props.moveItem(props.id, 0, monitor.getItem());
    }
  }
}

const DnDWrapper = (WrappedComponent, displayName) => {

  class DnD extends PureComponent {
    componentDidMount() {
      if (this.node) {
        const node = findDOMNode(this.node);
        this.display = node.style.display;
      }
    }
    componentWillReceiveProps(nextProps) {
      if (this.props.isDragging !== nextProps.isDragging) {
        if (this.node) {
          const node = findDOMNode(this.node);
          if (nextProps.isDragging) {
            node.style.display = 'none';
          } else {
            node.style.display = this.display;
          }
        }
      }
    }

    render() {
      const { connectDragSource, isDragging, layoutState, pseudoRef, moveItem, connectDropTarget, ...props } = this.props;
      return (
        <WrappedComponent {...props} pseudoRef={instance => {
          const node = findDOMNode(instance);
          if (props.id !== 'root') connectDragSource(node);
          connectDropTarget(node)
          this.node = instance;
          pseudoRef(instance);
        }} />
      );
    }
  }

  DnD.displayName = `DnDWrapper(${displayName})`
  hoistNonReactStatic(DnD, WrappedComponent);

  const mapStateToProps = ({ layoutState }) => ({ layoutState });

  const mapDispatchToProps = dispatch => ({
    moveItem: (...args) => dispatch(insertOrMoveItem(...args))
  });

  const droppable = DropTarget('Component', target, (conn, monitor) => ({
    connectDropTarget: conn.dropTarget()
  }))(DnD)

  return connect(mapStateToProps, mapDispatchToProps)(DragSource('Component', source, (conn, monitor) => ({
    connectDragSource: conn.dragSource(),
    isDragging: monitor.isDragging()
  }))(droppable))

};

export default DnDWrapper;
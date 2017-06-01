
import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource } from 'react-dnd';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { connect } from 'react-redux';

const source = {
  beginDrag(props) {
    console.log(props);
    return props.layoutState.getItem(props.id);
  }
};

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
      const { connectDragSource, isDragging, layoutState, pseudoRef, ...props } = this.props;
      return (
        <WrappedComponent {...props} pseudoRef={instance => {
          const node = findDOMNode(instance);
          if (props.id !== 'root') connectDragSource(node);
          this.node = instance;
          pseudoRef(instance);
        }} />
      );
    }
  }

  DnD.displayName = `DnDWrapper(${displayName})`
  hoistNonReactStatic(DnD, WrappedComponent);

  const mapStateToProps = ({ layoutState }) => ({ layoutState });

  return connect(mapStateToProps)(DragSource('Component', source, (conn, monitor) => ({
    connectDragSource: conn.dragSource(),
    isDragging: monitor.isDragging()
  }))(DnD))

};

export default DnDWrapper;
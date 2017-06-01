import React, { Component } from 'react';
import { connect } from 'react-redux';

const getWrappedComponent = (item, components, wrapper) => {
  const Comp = components[item.type] || item.type;
  return wrapper(Comp);
}

class WrapperManager extends Component {

  constructor(props) {
    super(props);
    this.state = {
      WrappedComponent: getWrappedComponent(
        props.item_, props.components_, props.RootWrapper_)
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.RootWrapper_ !== this.props.RootWrapper_) {
      this.setState({
        WrappedComponent: getWrappedComponent(
          props.item_, props.components_, props.RootWrapper_)
      });
    }
  }

  render() {
    const { item_, components_, RootWrapper_, dispatch, pseudoRef, ...props } = this.props;
    const { WrappedComponent } = this.state;
    return (
      <WrappedComponent {...item_.props} {...props} ref={instance => (typeof pseudoRef === 'function') && pseudoRef(instance)}>
        {item_.children.map(cId => <Wrapper key={cId} id={cId} />)}
      </WrappedComponent>
    );
  }

}

const mapStateToProps = ({ layoutState, layoutExtras }, { id }) => ({
  item_: layoutState.getItem(id),
  components_: layoutExtras.components,
  RootWrapper_: layoutExtras.RootWrapper,
});

const Wrapper = connect(mapStateToProps)(WrapperManager)

export default Wrapper;
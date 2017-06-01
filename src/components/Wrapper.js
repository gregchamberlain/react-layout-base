import React, { Component } from 'react';
import { connect } from 'react-redux';

const WrapperManager = ({ item, WrappedComponent, ...props }) => (
  <WrappedComponent id={item.id} {...item.props}>
    {item.children.map(cId => <Wrapper key={cId} id={cId} />)}
  </WrappedComponent>
);

const mapStateToProps = ({ layoutState, layoutExtras }, { id }) => {
  const item = layoutState.getItem(id);
  const WrappedComponent = layoutExtras.wrapperCache.getWrapped(item.type);
  return {
    item,
    WrappedComponent
  };
};

const Wrapper = connect(mapStateToProps)(WrapperManager)

export default Wrapper;
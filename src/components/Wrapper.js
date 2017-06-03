import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

const WrapperManager = ({ item, WrappedComponent, ...props }) => (
  <WrappedComponent data-id={item.id} {...item.props}>
    {item.children.map(cId => <Wrapper key={cId} id={cId} />)}
  </WrappedComponent>
);

WrapperManager.propTypes = {
  item: PropTypes.object.isRequired,
  WrappedComponent: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]).isRequired
}

const mapStateToProps = ({ layoutState, layoutExtras }, { id }) => {
  const item = layoutState.getItem(id);
  const WrappedComponent = layoutExtras.wrapperCache.getWrapped(item.type);
  return {
    item,
    WrappedComponent
  };
};

const Wrapper = connect(mapStateToProps)(WrapperManager)

Wrapper.propTypes = {
  id: PropTypes.string.isRequired
}

export default Wrapper;
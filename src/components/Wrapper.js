import React, { Component } from 'react';
import PropTypes from 'prop-types'
import connectLayout from '../utils/connectLayout';
import ItemKey from '../model/ItemKey';

const WrapperManager = ({ item, WrappedComponent, ...props }) => WrappedComponent ? (
  <WrappedComponent data-id={item.key} {...item.getProps()}>
    {item.children.map((c) => {
      if (c instanceof ItemKey) {
        return <Wrapper key={c} id={c} />
      } else {
        return c;
      }
    })}
  </WrappedComponent>
) : null;

WrapperManager.propTypes = {
  item: PropTypes.object.isRequired,
  WrappedComponent: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ])
}

const mapStateToProps = ({ layoutState, wrapperCache }, { id }) => {
  const item = layoutState.getItem(id);
  const WrappedComponent = wrapperCache.getWrapped(item.type);
  return {
    item,
    WrappedComponent
  };
};

const Wrapper = connectLayout(mapStateToProps)(WrapperManager)

Wrapper.propTypes = {
  id: PropTypes.instanceOf(ItemKey).isRequired
}

export default Wrapper;
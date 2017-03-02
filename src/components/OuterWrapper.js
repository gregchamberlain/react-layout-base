// @flow
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import LayoutState from '../model/LayoutState';
import InnerWrapper from './InnerWrapper';

type Props = {
  id: string,
  item: Object,
  Component: Function,
  RootWrapper: ReactClass<*>
};

const OuterWrapper = ({ id, item, Component, RootWrapper }: Props) => {
  return (
    <RootWrapper {...item.props} pseudoRef={() => {}} id={id}>
      <Component>
        {item.children.map(c => <Wrapper key={c} id={c} />)}
      </Component>
    </RootWrapper>
  )
};

OuterWrapper.propTypes = {
  id: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
  Component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  RootWrapper: PropTypes.func.isRequired
};

const mapStateToProps = ({ layoutState, layoutExtras }, { id }) => {
  const item = layoutState.getItem(id);
  if (item === undefined) {
    console.log('id', id);
    console.log(layoutState.items.toJS());
  }
  return {
    item,
    Component: layoutExtras.components[item.type] || item.type,
    RootWrapper: layoutExtras.RootWrapper
  }
};

const Wrapper = connect(mapStateToProps)(OuterWrapper);

export default Wrapper;
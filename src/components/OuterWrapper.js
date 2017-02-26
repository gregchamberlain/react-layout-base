// @flow
import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import LayoutState from '../model/LayoutState';
import InnerWrapper from './InnerWrapper';
import withStore from '../store/withStore';

type Props = {
  id: string,
  layoutState: LayoutState,
  components: Object,
  RootWrapper: ReactClass<*>
};

class OuterWrapper extends PureComponent {

  props: Props;

  componentWillMount() {
    console.log('mounting: ', this.props.id);
  }

  render() {

    const { id, layoutState, components, RootWrapper } = this.props;
    const item = layoutState.getItem(id);
    const Comp = components[item.type];

    return (
      <RootWrapper pseudoRef={() => {}} id={id}>
        <Comp {...item.props} id={id}>
          {item.children.map(c => <Wrapper key={c} id={c} />)}
        </Comp>
      </RootWrapper>
    );

  }

}

OuterWrapper.propTypes = {
  id: PropTypes.string.isRequired,
  layoutState: PropTypes.instanceOf(LayoutState).isRequired,
  components: PropTypes.object.isRequired,
};

const mapStateToProps = ({ layoutState, layoutExtras }) => ({
  layoutState,
  components: layoutExtras.components,
  RootWrapper: layoutExtras.RootWrapper
});

const Wrapper = connect(mapStateToProps)(OuterWrapper);

export default Wrapper;
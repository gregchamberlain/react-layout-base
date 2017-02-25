// @flow
import React, { PureComponent, PropTypes } from 'react';
import createFragment from 'react-addons-create-fragment'

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

const Wrapper = withStore('layoutState', 'components', 'RootWrapper')(OuterWrapper);

export default Wrapper;
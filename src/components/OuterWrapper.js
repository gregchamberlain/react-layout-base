// @flow
import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import LayoutState from '../model/LayoutState';
import InnerWrapper from './InnerWrapper';

type Props = {
  id: string,
  layoutState: LayoutState,
  components: Object,
  RootWrapper: ReactClass<*>
};

const OuterWrapper = ({ id, layoutState, components, RootWrapper }: Props) => {
  const item = layoutState.getItem(id);
  const Comp = components[item.type];
  return (
    <RootWrapper {...item.props} pseudoRef={() => {}} id={id}>
      <Comp>
        {item.children.map(c => <Wrapper key={c} id={c} />)}
      </Comp>
    </RootWrapper>
  )
};

// class OuterWrapper extends PureComponent {

//   props: Props;

//   render() {

//     const { id, layoutState, components, RootWrapper } = this.props;
//     const item = layoutState.getItem(id);
//     const Comp = components[item.type];

//     return (
//       <RootWrapper {...item.props} pseudoRef={() => {}} id={id}>
//         <Comp>
//           {item.children.map(c => <Wrapper key={c} id={c} />)}
//         </Comp>
//       </RootWrapper>
//     );

//   }

// }

OuterWrapper.propTypes = {
  id: PropTypes.string.isRequired,
  layoutState: PropTypes.instanceOf(LayoutState).isRequired,
  components: PropTypes.object.isRequired,
  RootWrapper: PropTypes.func.isRequired
};

const mapStateToProps = ({ layoutState, layoutExtras }) => ({
  layoutState,
  components: layoutExtras.components,
  RootWrapper: layoutExtras.RootWrapper
});

const Wrapper = connect(mapStateToProps)(OuterWrapper);

export default Wrapper;
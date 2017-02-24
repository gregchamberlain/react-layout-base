// @flow
import React, { PureComponent } from 'react';

import LayoutState from '../model/LayoutState';
import InnerWrapper from './InnerWrapper';

type Props = {
  id: string,
  layoutState: LayoutState,
  components: Object,
  plugins: Array<Object>
};

type State = {
  component: ?ReactClass<*>
};

class OuterWrapper extends PureComponent {

  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      component: null
    };
  }

  applyPlugins = (props: Props) => {
    const type: String = props.layoutState.
  }

}
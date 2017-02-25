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
  plugins: Array<Object>
};

type State = {
  component: ReactClass<*>
};

class OuterWrapper extends PureComponent {

  props: Props;
  state: State;
  cachedChildren: Object;

  constructor(props: Props) {
    super(props);
    this.state = {
      component: () => null
    };
    this.cachedChildren = {};
  }

  createChild = id => {
    if (!this.cachedChildren[id]) {
      this.cachedChildren[id] = <Wrapper key={id} id={id} />;
    }
    return this.cachedChildren[id];
  }

  componentWillMount() {
    // console.log('mounting: ', this.props.id);
    this.applyPlugins(this.props);
  }

  componentWillUpdate(nextProps) {
    const item = this.props.layoutState.getItem(this.props.id);
    const nextItem = nextProps.layoutState.getItem(nextProps.id);
    const children = item.children.map(c => this.createChild(c));
    const nextChildren = nextItem.children.map(c => this.createChild(c));
    nextChildren.forEach((child, idx) => {
      const id = nextItem.children[idx];
      if (this.cachedChildren[id] !== child) {
        console.warn('New child: ', id);
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.plugins !== this.props.plugins) {
      this.applyPlugins(nextProps);
    }
  }

  applyPlugins = (props: Props) => {
    console.log('applying wrapper plugins...');
    const type: String = props.layoutState.getItem(props.id).type;
    let component: ReactClass<*> = InnerWrapper(props.components[type], type); 
    props.plugins.forEach(plugin => {
      if (plugin.Wrapper) component = plugin.Wrapper(component, type);
    });
    this.setState({ component });
  }

  render() {

    const { id, layoutState } = this.props;
    const item = layoutState.getItem(id);
    const WrappedComponent: ReactClass<*> = this.state.component;

    return (
      <WrappedComponent id={id} pseudoRef={() => {}} {...item.props}>
        {item.children.map(childId => this.createChild(childId))}
      </WrappedComponent>
    );

  }

}

OuterWrapper.propTypes = {
  id: PropTypes.string.isRequired,
  layoutState: PropTypes.instanceOf(LayoutState).isRequired,
  components: PropTypes.object.isRequired,
  plugins: PropTypes.array.isRequired
};

const Wrapper = withStore('layoutState', 'components', 'plugins')(OuterWrapper);

export default Wrapper;
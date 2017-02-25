// @flow
import React, { PureComponent, PropTypes } from 'react';

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

  constructor(props: Props) {
    super(props);
    this.state = {
      component: () => null
    };
  }

  componentWillMount() {
    this.applyPlugins(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id || nextProps.plugins !== this.props.plugins) {
      this.applyPlugins(nextProps);
    }
  }

  applyPlugins = (props: Props) => {
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
        {React.Children.map(item.children, childId => (
          <Wrapper key={childId} id={childId} />
        ))}
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
import reducer from './reducer';
import Provider from './Provider';
import Component from './Component';

const factory = props => {
  return {
    Name: 'nextLayoutState',
    reducer: reducer(props.layoutState),
    Provider,
    Component
  };
}

export default factory;
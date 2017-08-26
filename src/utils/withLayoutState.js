import connectLayout from './connectLayout';
import hoistNonReactStatic from 'hoist-non-react-statics';

const mapStateToProps = ({ layoutState, onChange }) => ({
  layoutState,
  onChange
});

const mapDispatchToProps = () => ({});

const withLayoutState = (WrappedComponent) => {

  const wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  const WithLayoutState = connectLayout(mapStateToProps, mapDispatchToProps)(WrappedComponent);
  WithLayoutState.displayName = `withLayoutState(${wrappedComponentName})`;
  hoistNonReactStatic(WithLayoutState, WrappedComponent);
  return WithLayoutState;
};

export default withLayoutState;
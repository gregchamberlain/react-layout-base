import { connect } from 'react-redux';

export default (mapStateToProps, mapDispatchToProps, mergeProps, options) => {
  return connect(mapStateToProps, mapDispatchToProps, mergeProps, { storeKey: 'layoutStore', ...options });
}
import * as ACTIONS from './actions';

export default (state = {}, action) => {
  switch (action.type) {
    case ACTIONS.SET_STATE:
      return Object.assign({}, state, action.partialState);
    default:
      return state;
  }
}
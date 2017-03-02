import update from 'immutability-helper';

const layoutExtras = (state = {}, action) => {
  switch (action.type) {
    case 'SET_LAYOUT_EXTRA':
      let nextState = state;
      Object.keys(action.pairs).forEach(key => {
        nextState = update(nextState, { [key]: { $set: action.pairs[key] } })
      });
      return nextState;
    default:
      return state;
  }
}

export default layoutExtras;
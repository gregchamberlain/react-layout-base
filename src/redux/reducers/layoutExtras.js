import update from 'immutability-helper';

const layoutExtras = (state = {}, action) => {
  switch (action.type) {
    case 'SET_LAYOUT_EXTRA':
      return update(state, { [action.key]: { $set: action.value } });
    default:
      return state;
  }
}

export default layoutExtras;
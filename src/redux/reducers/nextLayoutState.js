import LayoutState from '../../model/LayoutState';

const nextLayoutState = (state = new LayoutState(), action) => {
  switch (action.type) {
    case 'SET_LAYOUT_STATE':
      return action.layoutState;
    default:
      return state;
  }
}

export default nextLayoutState;
import LayoutState from '../../model/LayoutState';

const nextLayoutState = (layoutState = new LayoutState(), action) => {
  switch (action.type) {
    case 'SET_LAYOUT_STATE':
      return action.layoutState;
    case 'REMOVE_ITEM':
      return layoutState.removeItem(action.id);
    default:
      return layoutState;
  }
}

export default nextLayoutState;
import LayoutState from '../../model/LayoutState';

import * as ACTIONS from '../../actions';

const nextLayoutState = (layoutState = new LayoutState(), action) => {
  switch (action.type) {
    case 'SET_LAYOUT_STATE':
      return action.layoutState;
    case 'REMOVE_ITEM':
      return layoutState.removeItem(action.id);
    case ACTIONS.INSERT_OR_MOVE_ITEM:
      return layoutState.insertOrMoveItem(action.parentId, action.idx, action.item);
    default:
      return layoutState;
  }
}

export default nextLayoutState;
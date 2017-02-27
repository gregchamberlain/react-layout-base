import LayoutState from '../../model/LayoutState';

import * as ACTIONS from '../../actions';

const nextLayoutState = (layoutState = new LayoutState('div'), action) => {
  switch (action.type) {
    case ACTIONS.SET_LAYOUT_STATE:
      return action.layoutState;
    case ACTIONS.REMOVE_ITEM:
      return layoutState.removeItem(action.id);
    case ACTIONS.INSERT_OR_MOVE_ITEM:
      return layoutState.insertOrMoveItem(action.parentId, action.idx, action.item);
    case ACTIONS.UPDATE_ITEM:
      return layoutState.updateItem(action.id, action.updater);
    default:
      return layoutState;
  }
}

export default nextLayoutState;
export const SET_LAYOUT_STATE = 'LAYOUT_STATE_SET_LAYOUT_STATE';
export const INSERT_OR_MOVE_ITEM = 'LAYOUT_STATE_INSERT_OR_MOVE_ITEM';
export const REMOVE_ITEM = 'LAYOUT_STATE_REMOVE_ITEM';
export const UPDATE_ITEM = 'LAYOUT_STATE_UPDATE_ITEM';

export const setLayoutState = layoutState => ({
  type: SET_LAYOUT_STATE,
  layoutState
});

export const insertOrMoveItem = (parentId, idx, item) => ({
  type: INSERT_OR_MOVE_ITEM,
  parentId,
  idx,
  item
});

export const updateItem = (id, updater) => ({
  type: UPDATE_ITEM,
  id,
  updater
});

export const removeItem = id => ({
  type: REMOVE_ITEM,
  id
});

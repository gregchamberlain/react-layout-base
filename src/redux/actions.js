export const setExtra = (key, value) => ({
  type: 'SET_LAYOUT_EXTRA',
  key,
  value
});

export const setLayoutState = layoutState => ({
  type: 'SET_LAYOUT_STATE',
  layoutState
});

const insertOrMoveItem = (parentId, idx, item) => ({
  type: 'ADD_ITEM',
  parentId,
  idx,
  item
});

const removeItem = id => ({
  type: 'REMOVE_ITEM',
  id
});
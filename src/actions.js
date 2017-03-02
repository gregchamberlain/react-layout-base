export const SET_LAYOUT_STATE = 'LAYOUT_STATE_SET_LAYOUT_STATE';
export const SET_LAYOUT_EXTRA = 'SET_LAYOUT_EXTRA';

export const setExtra = (key, value) => ({
  type: SET_LAYOUT_EXTRA,
  key,
  value
});

export const setLayoutState = layoutState => ({
  type: SET_LAYOUT_STATE,
  layoutState
});
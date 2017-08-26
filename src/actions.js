export const SET_LAYOUT_STATE = 'LAYOUT_STATE_SET_LAYOUT_STATE';
export const SET_LAYOUT_EXTRA = 'SET_LAYOUT_EXTRA';
export const SET_ON_CHANGE = 'SET_ON_CHANGE';

export const setExtra = (pairs) => ({
  type: SET_LAYOUT_EXTRA,
  pairs
});

export const setLayoutState = layoutState => ({
  type: SET_LAYOUT_STATE,
  layoutState
});

export const setOnChange = (onChange) => ({
  type: SET_ON_CHANGE,
  onChange
});
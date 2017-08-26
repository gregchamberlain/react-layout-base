export const SET_STATE = 'SET_STATE';

export const setState = (partialState) => ({
  type: SET_STATE,
  partialState
});
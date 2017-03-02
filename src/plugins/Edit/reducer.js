// @flow
import LayoutState from '../../model/LayoutState';
import { Map } from 'immutable';
import update from 'immutability-helper';
import * as ACTIONS from './actions';

const Reducer = (state: LayoutState = new LayoutState('div'), action: Object): LayoutState => {
  let nextState;
  switch (action.type) {
    case ACTIONS.SET_LAYOUT_STATE:
      return action.layoutState;
    case ACTIONS.INSERT_OR_MOVE_ITEM:
      if (action.item.id) {
        // Item already exists, MOVE_ITEM
        const oldParent = state.getItem(action.item.id).parent; 
        action.item.parent = { id: action.parentId, idx: action.idx };
        nextState = state
          .updateIn(['items', oldParent.id], item => update(item, {
            children: { $splice: [[oldParent.idx, 1]] }
          }))
          .updateIn(['items', action.parentId], item => update(item, {
            children: { $splice: [[action.idx, 0, action.item.id]] }
          }));
      } else {
        // Item doesnt exist, INSERT_ITEM
        action.item.id = generateRandomKey(state.items);
        action.item.parent = { id: action.parentId, idx: action.idx };
        nextState = state
          .setIn(['items', action.item.id], action.item)
          .updateIn(['items', action.parentId], item => update(item, {
            children: { $splice: [[action.idx, 0, action.item.id]] }
          }));
      }
      return nextState;
    case ACTIONS.UPDATE_ITEM:
      return state.updateIn(['items', action.id], item => update(item, action.updater));
    case ACTIONS.REMOVE_ITEM:
      if (action.id === 'root') return state;
      let children = [action.id]; 
      let parentRef = state.getIn(['items', action.id]).parent;
      nextState = state.updateIn(['items', parentRef.id], item => update(item, {
        children: { $splice: [[parentRef.idx, 1]] }
      }));
      while (children.length) {
        const id = children.pop();
        const item = state.getIn(['items', id]);
        children = children.concat(item.children);
        nextState = nextState.deleteIn(['items', id]);
      }
      return nextState;
    default:
      return state;
  }
}

const generateRandomKey = (items: Map<string, Object>): string => {
  let key;
  while (key === undefined || items.has(key) || !isNaN(Number(key))) {
    key = Math.floor(Math.random() * Math.pow(2, 24)).toString(32);
  }
  return key;
}

export default Reducer;
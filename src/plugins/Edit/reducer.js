// @flow
import LayoutState from '../../model/LayoutState';
import { Map } from 'immutable';
import update from 'immutability-helper';
import * as ACTIONS from './actions';

const Reducer = (layoutstate: LayoutState) => (state: LayoutState = layoutstate, action: Object): LayoutState => {
  let nextState;
  switch (action.type) {
    case ACTIONS.SET_LAYOUT_STATE:
      return action.layoutState;
    case ACTIONS.INSERT_OR_MOVE_ITEM:
      if (action.item.id) {
        // Item already exists, MOVE_ITEM
        const oldParent = state.getItem(action.item.id).parent; 
        action.item.parent = action.parentId;
        nextState = state
          .updateIn(['items', oldParent], item => update(item, {
            children: { $apply: c => c.filter(cId => cId !== action.item.id) }
          }))
          .updateIn(['items', action.parentId], item => update(item, {
            children: { $splice: [[action.idx, 0, action.item.id]] }
          }));
      } else {
        // Item doesnt exist, INSERT_ITEM
        action.item.id = generateRandomKey(state.items);
        action.item.parent = action.parentId;
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
      let parentRef = state.getItem(action.id).parent;
      nextState = state.updateIn(['items', parentRef], item => update(item, {
        children: { $apply: children => children.filter(cId => cId !== action.id) }
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
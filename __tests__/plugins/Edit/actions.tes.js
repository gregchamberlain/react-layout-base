import * as ACTIONS from '../../../src/plugins/Edit/actions';
import LayoutState from '../../../src/model/LayoutState';

describe('Edit Plugin Action Creators', () => {

  describe('setLayoutState', () => {
    it('should create an action to set the layoutState', () => {
      const state = new LayoutState('span');
      const action = ACTIONS.setLayoutState(state);
      expect(action).toEqual({ type: ACTIONS.SET_LAYOUT_STATE, layoutState: state });
    });
  });

  describe('insertOrMoveItem', () => {
    it('should create an action to insert or insert and item', () => {
      const item = { id: '1', props: {}, children: [] };
      const action = ACTIONS.insertOrMoveItem('root', 0, item);
      expect(action).toEqual({
        type: ACTIONS.INSERT_OR_MOVE_ITEM,
        parentId: 'root',
        idx: 0,
        item
      });
    });
  });

  describe('updateItem', () => {
    it('should create an action to update an item', () => {
      const action = ACTIONS.updateItem('root', { props: { a: { $set: 10 } } });
      expect(action).toEqual({
        type: ACTIONS.UPDATE_ITEM,
        id: 'root',
        updater: { props: { a: { $set: 10 } } }
      });
    });
  });

  describe('removeItem', () => {
    it('should create an action to remove an item', () => {
      const action = ACTIONS.removeItem('item1');
      expect(action).toEqual({ type: ACTIONS.REMOVE_ITEM, id: 'item1' });
    });
  });

});
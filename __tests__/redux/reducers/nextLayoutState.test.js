import { is } from 'immutable';

import LayoutState from '../../../src/model/LayoutState';
import reducer from '../../../src/redux/reducers/nextLayoutState';
import * as actions from '../../../src/actions';

const item = { type: 'test', props: {}, children: [] };

describe('nextLayoutState Reducer', () => {

  it('returns the default state', () => {
    expect(reducer(undefined, {})).toEqual(new LayoutState('div'))
  })

  describe('INSERT_OR_MOVE_ITEM', () => {

    describe('inserts a new item', () => {
      const action = {
        type: actions.INSERT_OR_MOVE_ITEM,
        parentId: 'root',
        idx: 0,
        item
      }
      const state = new LayoutState('div');
      const result = reducer(state, action);
      const newItem = result.items.toArray().filter(i => i.id !== 'root')[0];

      it('creates the new item', () => {
        expect(result.items.size).toEqual(2);
      })

      it('adds a reference to the parent', () => {
        expect(newItem.parent.id).toEqual('root');
        expect(newItem.parent.idx).toEqual(0);
      })

      it('adds it to the parent', () => {
        expect(result.getItem('root').children[0]).toEqual(newItem.id);
      })
    })

    describe('moves an existing item', () => {
      const items = {
        root: { id: 'root', type: 'div', props: {}, children: ['item1', 'item2'] },
        item1: { id: 'item1', type: 'div', props: {}, children: [], parent: { id: 'root', idx: 0 } },
        item2: { id: 'item2', type: 'div', props: {}, children: [], parent: { id: 'root', idx: 1 } },
      };
      const action = {
        type: actions.INSERT_OR_MOVE_ITEM,
        parentId: 'item1',
        idx: 0,
        item: items['item2']
      };
      const state = new LayoutState(items);
      const result = reducer(state, action);
    })

  })

  describe('REMOVE_ITEM', () => {
    const items = {
      root: { id: 'root', type: 'div', props: {}, children: ['item1'] },
      item1: { id: 'item1', type: 'div', props: {}, children: ['item2'], parent: { id: 'root', idx: 0 } },
      item2: { id: 'item2', type: 'div', props: {}, children: [], parent: { id: 'item1', idx: 0 } },
    };
    const action = {
      type: actions.REMOVE_ITEM,
      id: 'item1'
    };
    const state = new LayoutState(items);
    const result = reducer(state, action);
    it('removes the item', () => {
      expect(result.getItem('item1')).toBeUndefined();
    });
    it('removes the items children', () => {
      expect(result.getItem('item2')).toBeUndefined();
    })
    it('removes the item from the parents children', () => {
      expect(result.getItem('root').children[0]).toBeUndefined();
    })
  });

  describe('UPDATE_ITEM', () => {
    const action = {
      type: actions.UPDATE_ITEM,
      id: 'root',
      updater: { props: { test: { $set: 15 } } }
    };
    const state = new LayoutState('div');
    const result = reducer(state, action);
    it('updates the item', () => {
      expect(result.getItem('root').props.test).toEqual(15);
    })
  });

  describe('SET_LAYOUT_STATE', () => {
    const newState = new LayoutState('span');
    const action = {
      type: actions.SET_LAYOUT_STATE,
      layoutState: newState
    }
    const state = new LayoutState('div');
    it('replaces the entire state', () => {
      expect(reducer(state, action)).toEqual(newState);
    })
  })

})
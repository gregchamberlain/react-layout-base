import { is } from 'immutable';

import LayoutState from '../../src/model/LayoutState';

const rootItem = { id: 'root', type: 'Column', props: {}, style: {}, children: ['item1', 'item2'] };
const item1 = { id: 'item1', type: 'Test', props: {}, style: {}, children: ['item3'], parent: 'root' };
const item2 = { id: 'item2', type: 'Test', props: {}, style: {}, children: [], parent: 'root' };
const item3 = { id: 'item3', type: 'Test', props: {}, style: {}, children: [], parent: 'item1' };

const items = {
  root: rootItem,
  item1,
  item2,
  item3
};

const ids = new Set(['root', 'item1', 'item2', 'item3']);

// let state = LayoutState.fromRaw(items);
// let referenceState = LayoutState.fromRaw(items);
let state = new LayoutState(items);
let referenceState = new LayoutState(items);
let nextItem = { type: 'Test', props: {}, children: [], style: {} };

describe('LayoutState', () => {

  describe('INITIALIZE', () => {
    it('does not throw an error when supplied a component type', () => {
      expect(() => { new LayoutState('div') }).not.toThrow();
    })
    it('does not throw an error when supplied item state', () => {
      const items = { root: { id: 'root', type: 'div', props: {}, children: [] } };
      expect(() => { new LayoutState(items) }).not.toThrow();
    })
    it('throws an error when supplied nothing', () => {
      expect(() => { new LayoutState() }).toThrow();
    })
  })

  describe('#insertOrMoveItem', () => {
    let oldInsert = state.insertItem;
    state.insertItem = jest.fn((...args) => oldInsert.call(state, ...args));
    let oldMove = state.moveItem;
    state.moveItem = jest.fn((...args) => oldMove.call(state, ...args));
    state.insertOrMoveItem('root', 0, nextItem);
    it('calls insertItem with a new item', () => {
      expect(state.insertItem).toHaveBeenCalledWith('root', 0, nextItem);
    });
    state.insertOrMoveItem('item1', 0, item2);
    it('calls moveItem with an existing item', () => {
      expect(state.moveItem).toHaveBeenCalledWith('item1', 0, item2)
    })
  });

  describe('#insertItem', () => {
    let nextState = state.insertItem('root', 0, nextItem);
    let newItem = nextState.items.toArray().filter(item => !ids.has(item.id))[0];

    it('returns the next state', () => {
      expect(nextState instanceof LayoutState).toBe(true);
      expect(nextState).not.toEqual(state);
    });

    it('inserts item in parents children, at the correct index', () => {
      expect(nextState.getItem('root').children[0]).toEqual(newItem.id);
    })

    it('adds the item to nextState', () => {
      expect(nextState.getItem(newItem.id)).not.toBeUndefined();
    });

    it('doesnt mutate the original state', () => {
      expect(is(state,referenceState)).toBe(true);
    })
    
  });

  describe('#moveItem', () => {

    describe('same parent', () => {

      let nextState = state.moveItem('root', 2, state.getItem('item1'));

      it('returns the next state', () => {
        expect(nextState instanceof LayoutState).toBe(true);
        expect(nextState).not.toEqual(state);
      });

      it('inserts item in parents children, at the correct index', () => {
        expect(nextState.getItem('root').children[1]).toEqual('item1');
      });

      it('doesnt mutate the original state', () => {
        expect(is(state,referenceState)).toBe(true);
      });

    });

    describe('new parent', () => {
      let nextState = state.moveItem('item1', 0, state.getItem('item2'));

      it('returns the next state', () => {
        expect(nextState instanceof LayoutState).toBe(true);
        expect(nextState).not.toEqual(state);
      });

      it('removes item from old parents children', () => {
        expect(nextState.getItem('root').children).not.toContain('item2');
      });

      it('inserts item in parents children, at the correct index', () => {
        expect(nextState.getItem('item1').children[0]).toEqual('item2');
      });

      it('doesnt mutate the original state', () => {
        expect(is(state,referenceState)).toBe(true);
      });

    });

  });

  describe('#updateitem', () => {
    let nextState = state.updateItem('root', { props: { test: { $set: 1 } } });

    it('returns the next state', () => {
      expect(nextState instanceof LayoutState).toBe(true);
      expect(nextState).not.toEqual(state);
    });

    it('updates the item', () => {
      expect(nextState.getItem('root').props.test).toEqual(1);
    });

    it('doesnt mutate the original state', () => {
      expect(is(state,referenceState)).toBe(true);
    });

  });

  describe('#removeItem', () => {

    let nextState = state.removeItem('item1');

    it('returns the next state', () => {
      expect(nextState instanceof LayoutState).toBe(true);
      expect(nextState).not.toEqual(state);
    });

    it('removes the item', () => {
      expect(nextState.getItem('item1')).toBeUndefined();
    });

    it('removes the items children', () => {
      expect(nextState.getItem('item3')).toBeUndefined();
    });

    it('removes the item from parents children', () => {
      expect(nextState.getItem('root').children).not.toContain('item1');
    });

    it('doesnt mutate the original state', () => {
      expect(is(state,referenceState)).toBe(true);
    });
  });

  describe('#getitem', () => {

    it('with a valid id, returns the item object', () => {
      expect(state.getItem('item1')).toEqual(item1);
    });

    it('with invalid id, returns undefined', () => {
      expect(state.getItem('non-existent-id')).toBeUndefined();
    })

  });

  describe('#getSelectedItem', () => {

    it('returns undefined when no item is selected', () => {
      expect(state.getSelectedItem()).toBeUndefined();
    });

    let nextState = state.set('selectedItem', 'root');

    it('returns the selected item', () => {
      expect(nextState.getSelectedItem().id).toEqual('root');
    });

  });

  describe('#setSelectedItem', () => {
    let nextState = state.setSelectedItem('root');

    it('sets the selected item', () => {
      expect(nextState.get('selectedItem')).toEqual('root');
    });

    it('returns the next state', () => {
      expect(nextState instanceof LayoutState).toBe(true);
      expect(nextState).not.toEqual(state);
    });

    it('doesnt mutate the original state', () => {
      expect(is(state,referenceState)).toBe(true);
    });

  });

  describe('#getAncestors', () => {
    let ancestors = state.getAncestors('item1');
    it('returns an array of the items ancestors', () => {
      expect(ancestors).toEqual([rootItem, item1]);
    });
  });

  describe('#generateRandomKey', () => {
    const key = state.generateRandomKey();
    it('returns a random key', () => {
      expect(key).not.toBeUndefined();
    });
  });

  describe('#toRaw', () => {
    let raw = state.toRaw();
    expect(raw).toEqual(items);
  });

});

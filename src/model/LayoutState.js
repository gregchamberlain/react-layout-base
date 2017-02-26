// @flow
import { Map, Record, fromJS } from 'immutable';
import update from 'immutability-helper';

export const deepRemove = (map: LayoutState, id: string): LayoutState => {
  const children = map.getItem(id).children;
  if (children) children.forEach(child => {
    map = deepRemove(map, child)
  });
  return map.deleteIn(['items', id]);
};

const createItems = (type: string | Object): Map<string, Object> => Map({
  root: { id: 'root', type, props: {}, children: [] }
});

const defaultItems: Map<string, Object> = Map({ root: {
  id: 'root',
  type: 'Column',
  props: { },
  children: [],
  style: { }
}});

class LayoutState extends Record({ items: Map(), selectedItem: null }) {

  constructor(type: string | Object) {
    if (type instanceof Object) {
      super({ items: Map(type) });
    } else {
      super({ items: createItems(type) });
    }
  }

  /**
   * Gets an item by id
   * @param {Number} id
   * @return {Object} item
   */
  getItem(id: string): Object  {
    return this.items.get(id);
    // const item = this.items.get(id);
    // return item && item.toJS();
  }

  insertOrMoveItem(parentId: string, idx: number, item: Object): Object {
    return item.id ? this.moveItem(parentId, idx, item) : this.insertItem(parentId, idx, item);
  }

  insertItem(parentId: string, idx: number, item: Object): Object {
    item.id = this.generateRandomKey();
    item.parent = { id: parentId, idx: idx };
    let nextState: LayoutState = this
      .setIn(['items', item.id], item)
      .updateItem(parentId, { children: { $splice: [[idx, 0, item.id]] } });
    return nextState;
  }

  moveItem(parentId: string, idx: number, item: Object): Object {
    if (parentId === item.parent.id && idx > item.parent.idx) {
      idx--;
    }
    let nextState: LayoutState = this
      .updateItem(item.parent.id, { children: { $apply: c => c.filter(id => id !== item.id) } })
      .updateItem(parentId, { children: { $splice: [[idx, 0, item.id]] } })
      .updateItem(item.id, { parent: { $set: { id: parentId, idx } } });
    return nextState;
  }

  updateItem(id: string, updater: Object): LayoutState {
    return this.updateIn(['items', id], item => update(item, updater));
  }

  removeItem(id: string): LayoutState {
    if (id === 'root') return this;
    const item: Object = this.getItem(id);
    const parentId: string = item.parent.id;
    const nextState: LayoutState = this
    .updateItem(parentId, { children: { $apply: c => c.filter(cId => cId !== id) }});
    return deepRemove(nextState, id);
  }

  setSelectedItem(id: ?string): void {
    if (this.selectedItem === id) return;
    return this.set('selectedItem', id);
  }

  getSelectedItem(): ?Object {
    return this.items.get(this.selectedItem);
  }

  getAncestors(id: string): Array<Object> {
    let result: Array<Object> = [this.getItem(id)];
    while (result[0].parent && result.length < 4) {
      result.unshift(this.getItem(result[0].parent.id));
    }
    return result;
  }

  toRaw(): Object {
    return this.items.toJS();
  }

  generateRandomKey(): string {
    let key;
    while (key === undefined || this.items.has(key) || !isNaN(Number(key))) {
      key = Math.floor(Math.random() * Math.pow(2, 24)).toString(32);
    }
    return key;
  }

}

LayoutState.fromRaw = (raw: Object): LayoutState => {
  let layoutState: LayoutState = new LayoutState();
  return layoutState.set('items', Map(raw));
};

export default LayoutState;
// @flow
import { Map, Record, fromJS } from 'immutable';

export const deepRemove = (map: LayoutState, id: string): LayoutState => {
  const children = map.getIn(['items', id, 'children']);
  if (children) children.forEach(child => {
    map = deepRemove(map, child)
  });
  return map.deleteIn(['items', id]);
};

const defaultItems:Map = fromJS({ root: {
  id: 'root',
  type: 'Column',
  props: { },
  children: [],
  style: { }
}});

class LayoutState extends Record({ items: defaultItems, selectedItem: null }) {

  constructor() {
    super();
  }

  /**
   * Gets an item by id
   * @param {Number} id
   * @return {Object} item
   */
  getItem(id: string): Object  {
    const item = this.items.get(id);
    return item && item.toJS();
  }

  insertOrMoveItem(parentId: string, idx: number, item: Object): Object {
    return item.id ? this.moveItem(parentId, idx, item) : this.insertItem(parentId, idx, item);
  }

  insertItem(parentId: string, idx: number, item: Object): Object {
    item.id = this.generateRandomKey();
    item.parent = { id: parentId, idx: idx };
    let nextState: LayoutState = this
      .setIn(['items', item.id], fromJS(item))
      .updateIn(['items', parentId, 'children'], c => c.splice(idx, 0, item.id));
    this.onChange(nextState);
    return item;
  }

  moveItem(parentId: string, idx: number, item: Object): Object {
    if (parentId === item.parent.id && idx > item.parent.idx) {
      idx--;
    }
    let nextState: LayoutState = this
      .updateIn(['items', item.parent.id, 'children'], c => c.filter(id => id !== item.id))
      .updateIn(['items', parentId, 'children'], c => c.splice(idx, 0, item.id))
      .setIn(['items', item.id, 'parent'], fromJS({ id: parentId, idx })); 
    this.onChange(nextState);
    return nextState.getItem(item.id);
  }

  removeItem(id: string): ?Object {
    if (id === 'root') return;
    const item: Object = this.getItem(id);
    const parentId: string = item.parent.id;
    const nextState: LayoutState = this.updateIn(['items', parentId, 'children'], c => c.filter(cId => cId !== id));
    this.onChange(deepRemove(nextState, id))
    return item;
  }

  updateItem(id: string): Function {
    return (path: Array<string|number>, updater: Function): Object => {
      const nextState: LayoutState = this.updateIn(['items', id, ...path], updater);
      this.onChange(nextState);
      return nextState.getItem(id);
    };
  }

  setSelectedItem(id: ?string): void {
    if (this.selectedItem === id) return;
    this.onChange(this.set('selectedItem', id));
  }

  getSelectedItem(): ?Object {
    const item = this.items.get(this.selectedItem);
    return item && item.toJS();
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

  setOnChangeListener(listener: Function): boolean {
    this.listener = listener;
    return true;
  }

  onChange(nextState: LayoutState): void {
    this.listener(nextState);
  }
  
}

LayoutState.fromRaw = (raw: Object): LayoutState => {
  let layoutState: LayoutState = new LayoutState();
  return layoutState.set('items', fromJS(raw));
};

export default LayoutState;
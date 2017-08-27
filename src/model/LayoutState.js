// @flow
import { Map, List, Record, fromJS, OrderedMap } from 'immutable';

import type { ItemMap } from './ItemMap';

import Item from './Item';
import ItemKey from './ItemKey';
import ItemRef from './ItemRef';


const createDefaultItems = (type: string): Map<ItemKey, Item> => {
  const item: Item = new Item({ key: 'root', type });
  const key: ItemKey = item.key;
  return OrderedMap({ key: item });
};

const defaultState: {
  itemMap: ?ItemMap,
  pluginState: Map<string, mixed>
} = {
  itemMap: null,
  pluginState: Map()
};

const LayoutRecord = Record(defaultState);

class LayoutState extends LayoutRecord {
  constructor(rootType: string) {
    super({ itemMap: createDefaultItems(rootType) });
  }

  createItem(item: Object): Item {
    item.key = this.generateRandomKey();
    return Item.fromJS(item);
  }

  lastItem(): ItemKey {
    return this.itemMap.last();
  }

  generateRandomKey(): string {
    let key;
    while (key === undefined || this.itemMap.has(key) || !isNaN(Number(key))) {
      key = Math.floor(Math.random() * Math.pow(2, 24)).toString(32);
    }
    return key;
  }

  getItem(key: ItemKey) {
    return this.itemMap.get(key);
  }

  hasItem(key: ItemKey) {
    return this.itemMap.has(key);
  }

  toRaw() {
    return itemsToRaw(this.itemMap);
  }

  static fromRaw(rawItems: Object) {
    let items = OrderedMap();
    Object.keys(rawItems).forEach((key) => {
      const item = new Item(rawItems[key]);
      items = items.set(item.key, item);
    });
    let state = new LayoutState('div');
    return state.set('itemMap', items);
  }

  static ROOT_REF = new ItemKey('root')
}

const itemsToRaw = (items) => {
  const result = {};
  for (const itemKey of items.keys()) {
    result[itemKey.toJS()] = items.get(itemKey).toJS();
  }
  return result;
};

window.LayoutState = LayoutState;

export default LayoutState;
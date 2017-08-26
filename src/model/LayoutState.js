// @flow
import { Map, List, Record } from 'immutable';

const createDefaultItems = (type: string): Map<string, object> => Map({
  root: { id: 'root', type, props: {}, children: []}
});

const LayoutRecord = Record({
  items: Map(),
  pluginState: Map(),
});

class LayoutState extends LayoutRecord {

  constructor({ rootType, items }) {
    if (rootType) {
      super({ items: createDefaultItems(rootType) });
    } else {
      super({ items: Map(items) });
    }
  }

  getItem(id: string) {
    return this.items.get(id);
  }

  toRaw() {
    return this.items.toJS();
  }
}

export default LayoutState;
// @flow
import { Record, Map, List, fromJS } from 'immutable';

import ItemKey from './ItemKey';

const defaultRecord: {
  key: ?ItemKey,
  type: ?string,
  props: Map<string, mixed>,
  children: List<ItemKey | string>,
  parent: ?ItemKey,
  metadata: Map<string, mixed>
} = {
  key: null,
  type: null,
  props: Map(),
  children: List(),
  parent: null,
  metadata: Map()
};

type ItemProps = {
  key: string,
  type: string,
  props: Object,
  children: Array<Object | string>,
  parent: ?Object,
  metadata: ?Object
};

const ItemRecord = Record(defaultRecord);

class Item extends ItemRecord {

  constructor({ key, type, props = {}, children = [], parent, metadata }: ItemProps) {
    super({
      key: new ItemKey(key),
      type,
      props: fromJS(props),
      children: parseChildren(children),
      parent: new ItemKey(parent),
      metadata: fromJS(metadata)
    });
  }

  getProps() {
    return this.props.toJS();
  }

  getKey(): ItemKey {
    if (!this.ref) {
      this.ref = new ItemKey(this.key);
    }
    return this.ref;
  }

}

const parseChildren = (children) => {
  if (!children) return List();
  return List(children.map((child) => {
    if (typeof child === 'string') {
      return child;
    } else {
      return new ItemKey(child.key);
    }
  }));
}

export default Item;
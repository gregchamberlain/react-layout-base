import { Record } from 'immutable';

const ItemKeyRecord = Record({ key: null });

class ItemKey extends ItemKeyRecord {
  constructor(key) {
    super({ key });
  }

  toJS() {
    return this.key;
  }
}

export default ItemKey;
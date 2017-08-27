import { Record } from 'immutable';

const ItemRefRecord = Record({ key: null });

class ItemRef extends ItemRefRecord {
  constructor(key) {
    super({ key });
  }
}

export default ItemRef;
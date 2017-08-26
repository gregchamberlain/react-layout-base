import React from 'react';
import { Layout, LayoutState } from '../../../src';

import { createItem } from '../utils';

const items = {
  root: createItem()
}

let layoutState = new LayoutState({ items });
// layoutState = layoutState.insertOrMoveItem('root', 0, createItem());
// layoutState = layoutState.insertOrMoveItem('root', 0, createItem());
// const last = layoutState.items.last().id;
// layoutState = layoutState.insertOrMoveItem(last, 0, createItem());
// layoutState = layoutState.insertOrMoveItem(last, 0, createItem());

const BasicExample = () => (
  <Layout
    layoutState={layoutState}
  />
);

export default BasicExample;
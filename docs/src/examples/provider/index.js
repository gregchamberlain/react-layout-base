import React from 'react';
import { LayoutProvider, RootLayout, LayoutState } from '../../../../src/';

import { createItem } from '../../utils';
import ItemTree from './ItemTree';

let layoutState = new LayoutState('div');
layoutState = layoutState.insertOrMoveItem('root', 0, createItem());
layoutState = layoutState.insertOrMoveItem('root', 0, createItem());
layoutState = layoutState.insertOrMoveItem('root', 0, createItem());
layoutState = layoutState.insertOrMoveItem('root', 0, createItem());
let last = layoutState.items.last().id;
layoutState = layoutState.insertOrMoveItem(last, 0, createItem());
layoutState = layoutState.insertOrMoveItem(last, 0, createItem());
layoutState = layoutState.insertOrMoveItem(last, 0, createItem());
layoutState = layoutState.insertOrMoveItem(last, 0, createItem());
last = layoutState.items.last().id;
layoutState = layoutState.insertOrMoveItem(last, 0, createItem());
layoutState = layoutState.insertOrMoveItem(last, 0, createItem());

const ProviderExample = () => (
  <LayoutProvider
    layoutState={layoutState}
  >
    <div>
      <RootLayout />
      <ItemTree />
    </div>
  </LayoutProvider>
);

export default ProviderExample;
import React, { PureComponent } from 'react';
import { Layout, LayoutState } from '../../../src';

import { createItem, getStyle } from '../utils';

const items = {
  root: { key: 'root', type: 'div', props: { style: getStyle() }, children: [{ key: 'a' }, { key: 'b' }] },
  a: { key: 'a', type: 'div', props: { style: getStyle() }, children: [] },
  b: { key: 'b', type: 'div', props: { style: getStyle() }, children: [{ key: 'c' }] },
  c: { key: 'c', type: 'div', props: { style: getStyle() }, children: [] },
};

let layoutState = new LayoutState.fromRaw(items);

const BasicExample = () => (
  <Layout
    layoutState={layoutState}
  />
);

export default BasicExample;
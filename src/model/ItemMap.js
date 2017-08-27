// @flow
import type Item from './Item';
import type ItemKey from './ItemKey';
import type { OrderedMap } from 'immutable';

export type ItemMap = OrderedMap<ItemKey, Item>;
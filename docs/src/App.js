// @flow
import React, { PureComponent } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { Layout, LayoutState } from '../../src';
import Text from './components/Text';
import Column from './components/Column';

import { DnD, Style, ContextMenu, Hover } from './plugins';
import Edit from '../../src/plugins/Edit';

const item1 = text => ({ type: 'div', props: { style: { minHeight: 20, margin: 5, background: '#b535e5' } }, style: {}, children: [] });

let defaultState: LayoutState = new LayoutState('Column');
defaultState = defaultState.insertOrMoveItem('root', 0, item1('Item 1!'));
defaultState = defaultState.insertOrMoveItem('root', 1, item1('Item 2!'));
console.log(defaultState.toRaw());

const components = {
  Column,
  Text
};

class App extends PureComponent {

  state: {
    layoutState: LayoutState,
    value: string,
    checked: boolean
  }

  constructor() {
    super();
    this.state = {
      layoutState: defaultState,
      value: '',
      checked: true
    };
  }

  onChange = (layoutState: LayoutState) => {
    this.setState({ layoutState });
  }

  onValueChange = (e: any) => {
    this.setState({ value: e.target.value });
  }

  addItem = (e: any) => {
    e.preventDefault();
    let layoutState = this.state.layoutState.insertOrMoveItem('root', 0, item1(this.state.value));
    this.setState({ layoutState, value: '' });
  }

  applyAddon = (e: any) => {
    this.setState({ checked: e.target.checked });
  }

  printMarkup = () => {
    const markup = renderToStaticMarkup(
      <Layout
        layoutState={this.state.layoutState}
        onChange={() => {}}
        components={components}
      />
    );
    console.log(markup);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.addItem}>
          <input type="text" onChange={this.onValueChange} value={this.state.value} />
          <button>Add Item</button>
        </form>
        <button onClick={this.printMarkup}>Print Markup</button>
        <label>
          <input type="checkbox" onChange={this.applyAddon} checked={this.state.checked} />
          Plugins
        </label>
        <Layout
          layoutState={this.state.layoutState}
          onChange={this.onChange}
          components={components}
          plugins={ this.state.checked ? [Edit, DnD, ContextMenu, Hover] : ['taco'] }
        />
      </div>
    );
  }
}

export default App;

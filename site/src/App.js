// @flow
import React, { PureComponent } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { Layout, LayoutState } from '../../src';
import Text from './components/Text';
import Column from './components/Column';

const item1 = text => ({ type: 'Text', props: { text }, style: {}, children: [] });

let defaultState: LayoutState = new LayoutState();
defaultState.setOnChangeListener(nextState => {
  defaultState = nextState;
});
defaultState.insertOrMoveItem('root', 0, item1('Item 1!'));
defaultState.setOnChangeListener(nextState => {
  defaultState = nextState;
});
defaultState.insertOrMoveItem('root', 1, item1('Item 2!'));
console.log(defaultState.toRaw());

const components = {
  Column,
  Text
};

class App extends PureComponent {

  state: {
    layoutState: LayoutState,
    value: string
  }

  constructor() {
    super();
    this.state = {
      layoutState: defaultState,
      value: ''
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
    let layoutState;
    this.state.layoutState.setOnChangeListener(nextState => {
      layoutState = nextState;
    });
    this.state.layoutState.insertOrMoveItem('root', 0, item1(this.state.value));
    this.setState({ layoutState, value: '' });
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
        <Layout
          layoutState={this.state.layoutState}
          onChange={this.onChange}
          components={components}
        />
      </div>
    );
  }
}

export default App;

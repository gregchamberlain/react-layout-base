// @flow
import React, { PureComponent } from 'react';

import { Layout, LayoutState } from '../../src';

const Column = ({ children }) => <div style={{ border: '1px solid #aaa', padding: 10}}>{children}</div>
const Text = ({ text }) => <div>Text: {text}</div>

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
    layoutState: LayoutState
  }

  constructor() {
    super();
    this.state = {
      layoutState: defaultState
    };
  }

  onChange = (layoutState: LayoutState)=> {
    this.setState({ layoutState });
  }

  render() {
    return (
      <Layout
        layoutState={this.state.layoutState}
        onChange={this.onChange}
        components={components}
      />
    );
  }
}

export default App;

// @flow
import React, { PureComponent } from 'react';

import { Provider, LayoutState } from '../../src';

const TestComp = () => <div>This is a Test Component!</div>

const components = {
  TestComp
};

class App extends PureComponent {

  state: {
    layoutState: LayoutState
  }

  constructor() {
    super();
    this.state = {
      layoutState: new LayoutState()
    };
  }

  onChange = (layoutState: LayoutState)=> {
    this.setState({ layoutState });
  }

  render() {
    return (
      <Provider layoutState={this.state.layoutState} onChange={this.onChange} components={components}>
        <div>
          Hello there everyone!
        </div>
      </Provider>
    );
  }
}

export default App;

// @flow
import React, { PureComponent } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { Layout, LayoutState } from '../../src';
import Text from './components/Text';
// import Column from './components/Column';
import axios from 'axios';

import { Refs, DnD } from './plugins';
// import DnD from 'react-layout-plugin-dnd/lib';

const getColor = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgb(${r}, ${g}, ${b})`;
};

const item1 = type => ({ type: type || 'div', props: { style: { minHeight: 40, margin: 5, padding: 5, background: getColor() } }, style: {}, children: [] });
const col = () => ({ type: 'div', props: { backgroundColor: getColor() }, children: [] });

let defaultState: LayoutState = new LayoutState('div');
defaultState = defaultState.insertOrMoveItem('root', 0, item1());
defaultState = defaultState.insertOrMoveItem('root', 1, item1());
console.log(defaultState.toRaw());

const components = {
  Text
};

class App extends PureComponent {

  state: {
    layoutState: LayoutState,
    value: string,
    checked: boolean,
    urls: Array<string>
  }

  constructor() {
    super();
    this.state = {
      layoutState: defaultState,
      value: '',
      checked: true,
      urls: [],
      addons: [Refs, DnD]
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
    let layoutState = this.state.layoutState.insertOrMoveItem('root', 0, item1());
    this.setState({ layoutState, value: '' });
  }

  applyAddon = (e: any) => {
    this.setState({
      checked: e.target.checked,
      addons: e.target.checked ? [Refs, DnD] : []
    });
  }

  printMarkup = () => {
    // const markup = renderToStaticMarkup(
    //   <Layout
    //     layoutState={this.state.layoutState}
    //     onChange={() => {}}
    //     components={components}
    //   />
    // );
    // console.log(markup);
    axios.post('https://8j5okqi8r3.execute-api.us-west-2.amazonaws.com/dev/testRender', {
      items: this.state.layoutState.toRaw()
    }).then(resp => {
      this.setState({ urls: this.state.urls.concat(resp.data.link) });
    });
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
        { this.state.urls.map(url => (
          <a key={url} href={url} target="_blank">{url}</a>
          ))}
        <Layout
          layoutState={this.state.layoutState}
          onChange={this.onChange}
          components={components}
          plugins={this.state.addons}
        />
      </div>
    );
  }
}

export default App;

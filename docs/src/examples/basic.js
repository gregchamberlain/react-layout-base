import React, { PureComponent } from 'react';
import { RootLayout, LayoutState, LayoutProvider } from '../../../src';
import { Stack } from 'immutable';

import Refs from '../plugins/Refs';
import Dom from '../plugins/Dom';
import HoverDisplay from '../plugins/Hover/HoverDisplay';
import SelectedDisplay from '../plugins/Hover/SelectedDisplay';
import { createItem, getStyle } from '../utils';

const items = {
  root: { key: 'root', type: 'div', props: { style: getStyle() }, children: [{ key: 'a' }, { key: 'b' }] },
  a: { key: 'a', type: 'div', props: { style: getStyle() }, children: [] },
  b: { key: 'b', type: 'div', props: { style: getStyle() }, children: [{ key: 'c' }] },
  c: { key: 'c', type: 'div', props: { style: getStyle() }, children: [] },
};

class BasicExample extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      layoutState: LayoutState.fromRaw(items)
    }
    this.DomPlugin = Dom({
      mouseenter: this.onMouseOver,
      mouseleave: this.onMouseOut,
      click: this.onClick
    });
  }

  onMouseOver = (key, e) => {
    let layoutState = this.state.layoutState;
    layoutState = layoutState.updateIn(['pluginState', 'hover'], (stack) => stack ?
    stack.push({ key, node: e.target }) : Stack([{ key, node: e.target }]));
    this.setState({ layoutState });
  }

  onMouseOut = (key, e) => {
    const layoutState = this.state.layoutState.updateIn(['pluginState', 'hover'], (stack) => stack.pop());
    this.setState({ layoutState });
  }

  onClick = (key, e) => {
    e.stopPropagation();
    const layoutState = this.state.layoutState.setIn(['pluginState', 'selected'], { key, node: e.target });
    this.setState({ layoutState });
  }

  onChange = (layoutState) => {
    console.log(layoutState.getIn(['pluginState', 'dom']));
    this.setState({ layoutState });
  }

  render() {
    const hover = this.state.layoutState.getIn(['pluginState', 'hover']);
    return (
      <LayoutProvider
        layoutState={this.state.layoutState}
        onChange={this.onChange}
        plugins={[Refs, this.DomPlugin]}
      >
        <div>
          <RootLayout />
          <HoverDisplay />
          {hover && hover.map((data, index) => (
            <SelectedDisplay key={data.key.key} index={index} bounds={data.node.getBoundingClientRect()} type={this.state.layoutState.getIn(['itemMap', data.key, 'type'])}/>
          ))}
        </div>
      </LayoutProvider>
    )
  }
}
export default BasicExample;
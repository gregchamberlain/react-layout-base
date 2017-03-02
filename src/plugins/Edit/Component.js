import React from 'react';
import { connect } from 'react-redux';

import { insertOrMoveItem } from './actions';

const TestComp = ({ insertItem }) => (
  <div>
    <button onClick={insertItem}>Add Item!</button>
  </div>
);

const mapDispatchToProps = dispatch => ({
  insertItem: () => dispatch(insertOrMoveItem('root', 0, {
    type: 'div',
    props: {
      style: { height: 50, background: getBG(), margin: 5 },
    },
    children: []
  }))
});

const getBG = () => {
  let r = (Math.floor(Math.random()*255)).toString();
  let g = (Math.floor(Math.random()*255)).toString();
  let b = (Math.floor(Math.random()*255)).toString();
  return `rgb(${r}, ${g}, ${b})`;
}

export default connect(null, mapDispatchToProps)(TestComp);
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
      style: { height: 50, background: 'green', margin: 5 }
    },
    children: []
  }))
});

export default connect(null, mapDispatchToProps)(TestComp);
import React from 'react';
import { connectLayout } from '../../../../src';

const ItemTree = ({ item }) => (
  <ConnectedItemTreeNode id="root" />
);

const ItemTreeNode = ({ item }) => item.children.length ? (
  <div>
    <div>
      <span style={styles.bracket}>{'<'}</span>
      <span style={styles.tag}>{item.type}</span>
      &nbsp;
      <span style={styles.attrKey}>id</span>
      <span style={styles.bracket}>="</span>
      <span style={styles.attrVal}>{item.id}</span>
      <span style={styles.bracket}>"</span>
      <span style={styles.bracket}>{'>'}</span>
    </div>
    <div style={styles.children}>
      {item.children.map(cId => (
        <ConnectedItemTreeNode key={cId} id={cId} />
      ))}
    </div>
    <div>
      <span style={styles.bracket}>{'<'}</span>
      <span style={styles.tag}>/{item.type}</span>
      <span style={styles.bracket}>{'>'}</span>
    </div>
  </div>
) : (
  <div>
    <span style={styles.bracket}>{'<'}</span>
    <span style={styles.tag}>{item.type}</span>
    &nbsp;
    <span style={styles.attrKey}>id</span>
    <span style={styles.bracket}>="</span>
    <span style={styles.attrVal}>{item.id}</span>
    <span style={styles.bracket}>"</span>
    <span style={styles.bracket}>{'>'}</span>
    <span style={styles.bracket}>{'<'}</span>
    <span style={styles.tag}>/{item.type}</span>
    <span style={styles.bracket}>{'>'}</span>
  </div>
);

const styles = {
  children: {
    paddingLeft: 20,
    borderLeft: '1px dashed #aaa'
  },
  tag: {
    color: 'purple'
  },
  attrKey: {
    color: 'orange'
  },
  attrVal: {
    color: 'blue'
  },
  bracket: {
    color: '#aaa'
  }
};


const mapStateToProps = ({ layoutState }, { id }) => ({
  item: layoutState.getItem(id)
});

const ConnectedItemTreeNode = connectLayout(mapStateToProps)(ItemTreeNode);

export default ItemTree;
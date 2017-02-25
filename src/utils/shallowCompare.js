const shallowCompare = (a, b) => {
  if (a instanceof Array && b instanceof Array) return shallowCompareArray(a, b);
  if (a instanceof Object && b instanceof Object) return shallowCompareObject(a, b);
  return a === b;
}

const shallowCompareObject = (a, b) => {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) return false;
  for (let i=0; i<aKeys.length; i++) {
    let key = aKeys[i];
    if (a[key] !== b[key]) return false;
  }
  return true;
}

const shallowCompareArray = (a, b) => {
  if (a.length !== b.length) return false;
  for (let i=0; i<a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

export default shallowCompare;
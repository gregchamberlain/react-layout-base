// @flow

class Store {

  state: Object;
  listeners: Object;

  constructor(state: Object) {
    this.state = state;
    this.listeners = {};
  }

  update(key: string, value: any) {
    this.state[key] = value;
    this.listeners[key].forEach(listener => {
      listener(key, value);
    });
  }

  subscribe(keys: Array<string>, listener: Function) {
    let result: Object = {};
    keys.forEach(key => {
      if (this.listeners[key]) {
        this.listeners[key].add(listener);
      } else {
        this.listeners[key] = new Set([listener]);
      }
      result[key] = this.state[key];
    });
    return result;
  }

  unsubscribe(keys: Array<string>, listener: Function) {
    keys.forEach(key => {
      if (this.listeners[key]) {
        this.listeners[key].delete(listener);
      }
    });
  }

}

export default Store;

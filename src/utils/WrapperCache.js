import isCustomType from './isCustomType';

class WrapperCache {

  constructor(components, wrappers) {
    this.components_ = components;
    this.wrappers_ = wrappers;
    this.cache_ = {};
  }

  getWrapped(type) {
    if (this.cache_[type]) return this.cache_[type];
    this.createWrapper(type);
    return this.cache_[type];
  }

  createWrapper(type) {
    /**
     * If type is not a default component (e.i. 'div', 'span', etc.) it must be in components.
     * We check components for default types so they can be overridden if wanted.
     */
    let RootWrapper = isCustomType(type) ? this.components_[type] : this.components_[type] || type;
    if (!RootWrapper) {
      console.error(`Layout: Component of type "${type}" required, but not supplied.`);
      return;
    }
    this.wrappers_.forEach(wrapper => {
      RootWrapper = wrapper(RootWrapper, type);
    })
    this.cache_[type] = RootWrapper;
  }

}

export default WrapperCache;
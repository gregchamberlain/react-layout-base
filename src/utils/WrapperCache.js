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
    let RootWrapper = this.components_[type] || type;
    this.wrappers_.forEach(wrapper => {
      RootWrapper = wrapper(RootWrapper, type);
    })
    this.cache_[type] = RootWrapper;
  }

}

export default WrapperCache;
class WrapperCache {

  constructor(components, wrappers) {
    this.components_ = components;
    this.wrappers_ = wrappers;
    this.cache_ = {};
  }

  getWrapped(type) {
    if (this.cache_[type]) return this.cache_[type];
    let RootWrapper = this.components_[type] || type;
    this.wrappers_.forEach(wrapper => {
      RootWrapper = wrapper(RootWrapper);
    });
    this.cache_[type] = RootWrapper;
    return RootWrapper;
  }

}

export default WrapperCache;
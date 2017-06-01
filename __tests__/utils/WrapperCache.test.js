import WrapperCache from '../../src/utils/WrapperCache';

describe(WrapperCache, () => {
  describe('getWrapped', () => {
    it('Generates a wrapper for an uncached', () => {
      const wrapperCache = new WrapperCache({}, []);
      wrapperCache.createWrapper = jest.fn();
      wrapperCache.getWrapped('div');
      expect(wrapperCache.createWrapper).toHaveBeenCalled();
    });
    it('Uses a cached wrapped', () => {
      const wrapperCache = new WrapperCache({}, []);
      wrapperCache.cache_['div'] = true;
      wrapperCache.createWrapper = jest.fn();
      const wrapped = wrapperCache.getWrapped('div');
      expect(wrapperCache.createWrapper).not.toHaveBeenCalled();
      expect(wrapped).toBe(true);
    })
    it('Correctly generates a uncached wrapper', () => {
      const wrappers = [
        str => ('[' + str + ']'),
        str => ('(' + str + ')'),
      ];
      const wrapperCache = new WrapperCache({}, wrappers);
      const wrapped = wrapperCache.getWrapped('div');
      expect(wrapped).toEqual('([div])')
    })
  });
});
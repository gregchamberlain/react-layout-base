import { Layout, LayoutState, RootLayout, Provider } from '../src';

describe('Package exports', () => {
  it('exports Layout', () => {
    expect(Layout).not.toBeUndefined();
  });
  it('exports LayoutState', () => {
    expect(LayoutState).not.toBeUndefined();
  });
  it('exports Layout', () => {
    expect(RootLayout).not.toBeUndefined();
  });
  it('exports Layout', () => {
    expect(Provider).not.toBeUndefined();
  });
});
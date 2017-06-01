import { Layout, LayoutState, RootLayout, LayoutProvider } from '../src';

describe('Package exports', () => {
  it('exports Layout', () => {
    expect(Layout).not.toBeUndefined();
  });
  it('exports LayoutState', () => {
    expect(LayoutState).not.toBeUndefined();
  });
  it('exports RootLayout', () => {
    expect(RootLayout).not.toBeUndefined();
  });
  it('exports LayoutProivder', () => {
    expect(LayoutProvider).not.toBeUndefined();
  });
});
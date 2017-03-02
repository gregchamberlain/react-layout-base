import React from 'react';
import InnerWrapper from '../../src/components/InnerWrapper';
import { mount } from 'enzyme';

describe('InnerWrapper', () => {
  let wrapper, MockComponent, instance, pseudoRef, startProps;
  beforeEach(() => {
    startProps = {
      a: 1,
      b: 2,
      c: 'hello'
    };
    MockComponent = () => <div>Mock Component</div>;
    pseudoRef = jest.fn();
    wrapper = mount(
      <InnerWrapper pseudoRef={pseudoRef} {...startProps} >
        <MockComponent />
      </InnerWrapper>
    );
    instance = wrapper.instance();
  });

  it('renders the Component', () => {
    expect(wrapper.find(MockComponent)).toBeTruthy();
  });

  it('calls the pseudoRef with the instance', () => {
    expect(pseudoRef).toHaveBeenCalled();
  });

  it('passes down props', () => {
    expect(wrapper.find(MockComponent).props()).toEqual(startProps);
  });


});
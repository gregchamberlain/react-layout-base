import { ActionTypes } from 'redux/lib/createStore'
import combineReducers from '../../src/redux/combineReducers';

const ACTION = { type: 'INIT' };

console.error = jest.genMockFn();

describe('combineReducers', () => {

  it('calls all reducers', () => {
    const a = jest.fn((state = {}, action) => state);
    const b = jest.fn((state = {}, action) => state);
    const c = jest.fn((state = {}, action) => state);
    const rootReducer = combineReducers({ a, b, c });
    const nextState = rootReducer({}, ACTION);
    expect(a).toHaveBeenCalled();
    expect(b).toHaveBeenCalled();
    expect(c).toHaveBeenCalled();
    expect(nextState).toEqual({ a: {}, b: {}, c: {} });
  })

  it('throws for a reducer with no default state', () => {
    const reducerA = (state, action) => state;
    const rootReducer = combineReducers({ reducerA });
    expect(() => { rootReducer({}, ACTION) }).toThrow();
  });

  it('throws if a reducer returns undefined on random action', () => {
    const a = (state = {}, action) => action.type === ActionTypes.INIT ? state : undefined;
    const rootReducer = combineReducers({ a });
    expect(() => { rootReducer({}, ACTION) }).toThrow();
  });

  it('throws if a reducer returns undefined', () => {
    const a = (state = {}, action) => {
      return action.type === ACTION.type ? undefined : state
    };
    const rootReducer = combineReducers({ a });
    expect(() => { rootReducer({ a: {} }, ACTION) }).toThrow();
  });

  it('removes unexpected state', () => {
    const a = (state = {}, action) => state;
    const rootReducer = combineReducers({ a });
    const nextState = rootReducer({ a: 1, b: 2 }, ACTION);
    expect(nextState).toEqual({ a: 1 });
  });

  it('handles new reducers with old state', () => {
    const a = (state = {}, action) => state;
    const b = (state = {}, action) => state;
    const rootReducer = combineReducers({ a, b });
    const nextState = rootReducer({ b: 3 }, ACTION);
    expect(nextState).toEqual({ a: {}, b: 3 });
  });

  it('console.error if a key has no reducer', () => {
    const err = jest.fn(console.error);
    const a = undefined;
    const rootReducer = combineReducers({ a });
    expect(console.error).toHaveBeenCalled();
  });

});
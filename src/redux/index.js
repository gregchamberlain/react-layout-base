import { createStore, combineReducers, applyMiddleware } from 'redux';
import layoutState from './reducers/layoutState';
import nextLayoutState from './reducers/nextLayoutState';
import layoutExtras from './reducers/layoutExtras';

export default function configureStore(initialState, middleware) {
  // const store = createStore(createReducer(), initialState, applyMiddleware(middleware));
  const store = createStore(createReducer(), initialState);
  store.dynamicReducers = {};
  return store;
}

export const injectReducers = (store, reducers) => {
  Object.keys(reducers).forEach(name => {
    store.dynamicReducers[name] = reducers[name];
  });
  store.replaceReducer(createReducer(store.asyncReducer));
}

const createReducer = (reducers) => combineReducers({
  ...reducers,
  layoutState,
  nextLayoutState,
  layoutExtras
});
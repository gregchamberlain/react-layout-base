import { createStore, combineReducers, applyMiddleware } from 'redux';
import layoutState from './reducers/layoutState';
import nextLayoutState from './reducers/nextLayoutState';
import layoutExtras from './reducers/layoutExtras';

export default function configureStore(reducers, initialState, middleware) {
  const store = createStore(createReducer(reducers), initialState, applyMiddleware(middleware));
  store.dynamicReducers = reducers;
  return store;
}

export const injectReducers = (store, reducers) => {
  Object.keys(reducers).forEach(name => {
    store.dynamicReducers[name] = reducers[name];
  });
  store.replaceReducer(createReducer(store.dynamicReducers));
}

const createReducer = (reducers) => combineReducers({
  ...reducers,
  layoutState,
  nextLayoutState,
  layoutExtras
});

export const createMiddleware = (initialMiddlewares) => {
  let middlewares = initialMiddlewares;
  const MasterMiddleware = store => next => act => {
    const nextMiddleware = remaining => action => remaining.length
      ? remaining[0](store)(nextMiddleware(remaining.slice(1)))(action)
      : next(action);
    nextMiddleware(middlewares)(act);
  };
  const injectMiddlewares = (newMiddlewares) => {
    middlewares = newMiddlewares;
  }
  return {
    MasterMiddleware,
    injectMiddlewares
  }
};
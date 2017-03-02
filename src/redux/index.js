import { createStore, applyMiddleware, compose } from 'redux';
import combineReducers from './combineReducers';
import layoutState from './reducers/layoutState';
import layoutExtras from './reducers/layoutExtras';

const composeEnhancers = typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

export default function configureStore(reducers, initialState, middlewares) {
  const MasterMiddleware = store => next => act => {
    const nextMiddleware = remaining => action => remaining.length
      ? remaining[0](store)(nextMiddleware(remaining.slice(1)))(action)
      : next(action);
    nextMiddleware(middlewares)(act);
  };
  const store = createStore(createReducer(reducers), initialState, composeEnhancers(applyMiddleware(MasterMiddleware)));
  store.injectReducers = (reducers) => {
    store.replaceReducer(createReducer(reducers));
  };
  store.injectMiddlewares = (newMiddlewares) => {
    middlewares = newMiddlewares;
  }
  return store;
}

// const injectReducers = (store, reducers) => {
//   store.replaceReducer(createReducer(reducers));
// }

const createReducer = (reducers) => combineReducers({
  ...reducers,
  layoutState,
  layoutExtras
});

// const createMiddleware = (initialMiddlewares) => {
//   let middlewares = initialMiddlewares;
//   const MasterMiddleware = store => next => act => {
//     const nextMiddleware = remaining => action => remaining.length
//       ? remaining[0](store)(nextMiddleware(remaining.slice(1)))(action)
//       : next(action);
//     nextMiddleware(middlewares)(act);
//   };
//   const injectMiddlewares = (newMiddlewares) => {
//     middlewares = newMiddlewares;
//   }
//   return {
//     MasterMiddleware,
//     injectMiddlewares
//   }
// };
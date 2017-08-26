import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducer';

const composeEnhancers = typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

export default (initialState = {}) => createStore(reducer, initialState, composeEnhancers(applyMiddleware()));

// export default function configureStore(reducers, initialState, middlewares) {
//   const MasterMiddleware = store => next => act => {
//     const nextMiddleware = remaining => action => remaining.length
//       ? remaining[0](store)(nextMiddleware(remaining.slice(1)))(action)
//       : next(action);
//     nextMiddleware(middlewares)(act);
//   };
//   const store = createStore(createReducer(reducers), initialState, composeEnhancers(applyMiddleware(MasterMiddleware)));
//   store.injectReducers = (reducers) => {
//     store.replaceReducer(createReducer(reducers));
//   };
//   store.injectMiddlewares = (newMiddlewares) => {
//     middlewares = newMiddlewares;
//   }
//   return store;
// }

// const createReducer = (reducers) => combineReducers({
//   ...reducers,
//   layoutState,
//   layoutExtras
// });
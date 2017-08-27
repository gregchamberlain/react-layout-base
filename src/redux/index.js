import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducer';

const composeEnhancers = typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

export default (initialState = {}) => createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware())
);
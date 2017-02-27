import { ActionTypes } from 'redux/lib/createStore'
import warning from 'redux/lib/utils/warning';

const NODE_ENV = typeof process !== 'undefined' ? process.env.NODE_ENV : 'development';

function getUndefinedStateErrorMessage(key, action) {
  const actionType = action && action.type;
  const actionName = (actionType && `"${actionType.toString()}"`) || 'an action';

  return (
    `Given action ${actionName}, reducer "${key}" returned undefined. ` +
    `To ignore an action, you must explicitly return the previous state. ` +
    `If you want this reducer to hold no value, you can return null instead of undefined.`
  );
}

function assertReducerSanity(reducers) {
  Object.keys(reducers).forEach(key => {
    const reducer = reducers[key];
    const initialState = reducer(undefined, { type: ActionTypes.INIT })

    if (typeof initialState === 'undefined') {
      throw new Error(
        `Reducer "${key}" returned undefined during initialization. ` +
        `If the state passed to the reducer is undefined, you must ` +
        `explicitly return the initial state. The initial state may ` +
        `not be undefined. If you don't want to set a value for this reducer, ` +
        `you can use null instead of undefined.`
      )
    }

    const type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.')
    if (typeof reducer(undefined, { type }) === 'undefined') {
      throw new Error(
        `Reducer "${key}" returned undefined when probed with a random type. ` +
        `Don't try to handle ${ActionTypes.INIT} or other actions in "redux/*" ` +
        `namespace. They are considered private. Instead, you must return the ` +
        `current state for any unknown actions, unless it is undefined, ` +
        `in which case you must return the initial state, regardless of the ` +
        `action type. The initial state may not be undefined, but can be null.`
      )
    }
  })
}

function removeUnexpectedState(lastState, reducer) {
  Object.keys(lastState).forEach(key => {
    if (!reducer[key]) {
      delete lastState[key];
    }
  });
  return lastState;
}

export default function combineReducers(reducers) {

  const finalReducer = {};

  Object.keys(reducers).forEach(key => {
    const reducer = reducers[key];
    if (NODE_ENV !== 'production') {
      if (typeof reducer === 'undefined') {
        warning(`No reducer provider for key "${key}"`)
      }
    }

    if (typeof reducer === 'function') {
      finalReducer[key] = reducer;
    }
  });

  const finalReducerKeys = Object.keys(finalReducer);

  let sanityError;
  try {
    assertReducerSanity(finalReducer);
  } catch (e) {
    sanityError = e;
  }

  return function rootReducer(state = {}, action) {

    if (sanityError) {
      throw sanityError;
    }

    removeUnexpectedState(state, finalReducer);

    let hasChanged = false;
    let nextState = {};

    finalReducerKeys.forEach(key => {
      const reducer = finalReducer[key];
      const previousStateForKey = state[key];
      const nextStateForKey = reducer(previousStateForKey, action);
      if (typeof nextStateForKey === 'undefined') {
        const errorMessage = getUndefinedStateErrorMessage(key, action);
        throw new Error(errorMessage);
      }
      nextState[key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    });

    return hasChanged ? nextState : state;
    
  }

}
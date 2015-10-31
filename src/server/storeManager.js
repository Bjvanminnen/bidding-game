import { compose, createStore, applyMiddleware } from 'redux';
// import createLogger from 'redux-node-logger';

import serverReducer from '../redux/serverReducer';
import { resolveBidsIfNecessary } from '../redux/serverReducer';

// const logger = createLogger();

let storeId = 0;

const logger = store => next => action => {
  console.log(action.type);
  next(action);
};

let activeStore;

export function getActiveStore() {
  if (!activeStore) {
    return createActiveStore();
  }
  return activeStore;
}

export function createActiveStore() {
  activeStore = compose(
    applyMiddleware(resolveBidsIfNecessary, logger)
  )(createStore)(serverReducer, { storeId: storeId++ });
  return activeStore;
}

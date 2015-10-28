import React from 'react';
import { compose, createStore, applyMiddleware } from 'redux';
import { devTools } from 'redux-devtools';
import createLogger from 'redux-logger';

import serverReducer from './redux/serverReducer';
import { resolveBidsIfNecessary, readyForResolve } from './redux/serverReducer';

const logger = createLogger();

const store = compose(
  applyMiddleware(resolveBidsIfNecessary),
  devTools()
)(createStore)(serverReducer);

let listeners = [];

function dispatchStateToListeners(state) {
  listeners.forEach(listener => {
    setTimeout(() => listener(state), 1000);
  });
}

store.subscribe(() => {
  const state = store.getState();

  // adding devTools results in store firing once before we have any "real"
  // actions. this prevents that from making it to the client
  if (state.round === 1 && !state.bidThisRound[0] && !state.bidThisRound[1]) {
    return;
  }

  // wait for resolution before informing client
  if (readyForResolve(state)) {
    return;
  }

  dispatchStateToListeners(state);
});

function applyAction(action) {
  // make async so that it behaves like a server
  setTimeout(() => store.dispatch(action), 1000);
}

function listen(listener) {
  listeners.push(listener);
}

function requestState() {
  dispatchStateToListeners(store.getState());
}

export default { applyAction, listen, requestState, store };

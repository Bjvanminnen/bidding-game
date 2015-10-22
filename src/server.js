import { compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import { devTools } from 'redux-devtools';

import reducer from './redux/reducer';

const store = compose()(createStore)(reducer);

let listeners = [];

store.subscribe(() => {
  const state = store.getState();
  console.log('newState', state);
  listeners.forEach(listener => { listener(state) });
});

function applyAction(action) {
  // make async so that it behaves like a server
  setTimeout(() => { store.dispatch(action); }, 1000);
}

function listen(listener) {
  listeners.push(listener);
}


export default { applyAction, listen };

import React from 'react';
import ReactDOM from 'react-dom';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { devTools } from 'redux-devtools';
import io from 'socket.io-client';

import App from './App';
import MyDevTools from './MyDevTools';
import ActionSequence from './ActionSequence';

import serverReducer from './redux/serverReducer';
import { serverUpdate } from './redux/serverActions';

import clientReducer from './redux/clientReducer';
import { SUBMIT_BID, activatePlayer } from './redux/clientActions';

const socket = io(`${location.protocol}//${location.hostname}:8080`);

function getParameterByName(name) {
  const match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

// middleware that sends ever action to the server
const sendToServer = store => next=> action=> {
  if (action.type === SUBMIT_BID) {
    socket.emit('action', action);
  }
  next(action);
};

const playerId = parseInt(getParameterByName('pid') || 1, 10) - 1;

const store = compose(
  applyMiddleware(sendToServer),
  devTools()
)(createStore)(clientReducer);
store.dispatch(activatePlayer(playerId));

socket.on('update', state => {
  store.dispatch(serverUpdate(state));
});

function resetServerStore() {
  socket.emit('reset')
}

ReactDOM.render(
  <div>
    <Provider store={store}>
      <App />
    </Provider>
    <Provider store={store}>
      <ActionSequence />
    </Provider>
    <MyDevTools store={store} right={0}/>
    <button onClick={resetServerStore}>Reset</button>
  </div>,
  document.getElementById('root'));

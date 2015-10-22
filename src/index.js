import React from 'react';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { devTools } from 'redux-devtools';

import App from './App';
import MyDevTools from './MyDevTools';
import ActionSequence from './ActionSequence';

import reducer from './redux/reducer';
import { RECEIVE_STATE, receiveState, clientReducer } from './redux/reducer';
import server from './server';

// middleware that sends ever action to the server
const sendToServer = store => next=> action=> {
  if (action.type !== RECEIVE_STATE) {
    server.applyAction(action);
  }
  next(action);
};

// our client store
const store = compose(
  applyMiddleware(sendToServer),
  devTools(),
)(createStore)(reducer);

// store2 only responds to RECEIVE_STATE
const store2 = compose(
  applyMiddleware(sendToServer),
  devTools()
)(createStore)(clientReducer);

// listen to server changes, and dispatch state to client store
server.listen(state => {
  store2.dispatch(receiveState(state));
});

React.render(
  <div>
    <Provider store={store}>
      { () => <App /> }
    </Provider>
    <Provider store={store2}>
      { () => <App /> }
    </Provider>
    <Provider store={store}>
      { () => <ActionSequence /> }
    </Provider>
    <MyDevTools store={store2}/>
  </div>,
  document.getElementById('root'));

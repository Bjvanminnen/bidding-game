import React from 'react';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { devTools } from 'redux-devtools';

import App from './App';
import MyDevTools from './MyDevTools';
import ActionSequence from './ActionSequence';

import serverReducer from './redux/serverReducer';
import { SUBMIT_BID, serverUpdate } from './redux/serverReducer';
import server from './server';

import clientReducer from './redux/clientReducer';
import { activatePlayer } from './redux/clientReducer';

// middleware that sends ever action to the server
const sendToServer = store => next=> action=> {
  if (action.type === SUBMIT_BID) {
    server.applyAction(action);
  }
  next(action);
};

const store = compose(
  applyMiddleware(sendToServer),
  devTools()
)(createStore)(clientReducer);
store.dispatch(activatePlayer(0));

const store2 = compose(
  applyMiddleware(sendToServer),
  devTools()
)(createStore)(clientReducer);
store2.dispatch(activatePlayer(1));

// listen to server changes, and dispatch state to client store
server.listen(state => {
  store.dispatch(serverUpdate(state));
  store2.dispatch(serverUpdate(state));
});

server.requestState();

React.render(
  <div>
    <Provider store={store}>
      { () => <App /> }
    </Provider>
    <div style={{padding: 20}}>----------------------------------------------------------------------</div>
    <Provider store={store2}>
      { () => <App /> }
    </Provider>
    <Provider store={store}>
      { () => <ActionSequence /> }
    </Provider>
    <MyDevTools store={store} right={620}/>
    <MyDevTools store={store2} right={310}/>
    <MyDevTools store={server.store} right={0}/>
  </div>,
  document.getElementById('root'));

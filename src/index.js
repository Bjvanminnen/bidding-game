import React from 'react';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { devTools } from 'redux-devtools';

import App from './App';
import MyDevTools from './MyDevTools';
import ActionSequence from './ActionSequence';

import reducer from './redux/reducer';
import { SUBMIT_BID } from './redux/reducer';
import {
  RECEIVE_STATE,
  receiveState,
  activatePlayer,
  reducer as clientReducer
} from './redux/clientReducer';
import server from './server';

// middleware that sends ever action to the server
const sendToServer = store => next=> action=> {
  if (action.type === SUBMIT_BID) {
    server.applyAction(action);
  }
  next(action);
};

// our client store
const store = compose(
  applyMiddleware(sendToServer),
  devTools(),
)(createStore)(clientReducer);
store.dispatch(activatePlayer(0));

const store2 = compose(
  applyMiddleware(sendToServer),
  devTools()
)(createStore)(clientReducer);
store2.dispatch(activatePlayer(1));

// listen to server changes, and dispatch state to client store
server.listen(state => {
  store.dispatch(receiveState(state));
  store2.dispatch(receiveState(state));
});

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
    <MyDevTools store={store} right={310}/>
    <MyDevTools store={store2} right={0}/>
  </div>,
  document.getElementById('root'));

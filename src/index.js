import React from 'react';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { devTools } from 'redux-devtools';

import MyDevTools from './MyDevTools';
import ActionSequence from './ActionSequence';

import serverReducer from './redux/serverReducer';
import { SUBMIT_BID, serverUpdate } from './redux/serverReducer';
import server from './serverNew';

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
)(createStore)(serverReducer);

const store2 = compose(
  applyMiddleware(sendToServer),
  devTools()
)(createStore)(serverReducer);

// listen to server changes, and dispatch state to client store
server.listen(state => {
  store.dispatch(serverUpdate(state));
  store2.dispatch(serverUpdate(state));
});

React.render(
  <div>
    <Provider store={store}>
      { () => <ActionSequence /> }
    </Provider>
    <MyDevTools store={store} right={620}/>
    <MyDevTools store={store2} right={310}/>
    <MyDevTools store={server.store} right={0}/>
  </div>,
  document.getElementById('root'));

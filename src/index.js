import React from 'react';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { devTools } from 'redux-devtools';

import MyDevTools from './MyDevTools';
import ActionSequence from './ActionSequence';

import serverReducer from './redux/serverReducer';
import { resolveBidsIfNecessary } from './redux/serverReducer';

const store = compose(
  applyMiddleware(resolveBidsIfNecessary),
  devTools()
)(createStore)(serverReducer);

React.render(
  <div>
    <Provider store={store}>
      { () => <ActionSequence /> }
    </Provider>
    <MyDevTools store={store} right={0}/>
  </div>,
  document.getElementById('root'));

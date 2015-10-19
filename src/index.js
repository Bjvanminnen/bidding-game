import React from 'react';
import App from './App';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './redux/reducer';

let store = createStore(reducer);

React.render(
  <Provider store={store}>
    { () => <App /> }
  </Provider>,
  document.getElementById('root'));

/**
User Actions:
SUBMIT_BID

Controller Actions:


Server Actions:
RECEIVE_STATE

Some sort of error action?
*/

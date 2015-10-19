import React from 'react';
import App from './App';
import MyDevTools from './MyDevTools';

import { compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import { devTools } from 'redux-devtools';

import reducer from './redux/reducer';

// let store = createStore(reducer);
const store = compose(
  devTools(),
  // persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore)(reducer);


React.render(
  <div>
    <Provider store={store}>
      { () => <App /> }
    </Provider>
    <MyDevTools store={store}/>
  </div>,
  document.getElementById('root'));

/**
User Actions:
SUBMIT_BID

Controller Actions:


Server Actions:
RECEIVE_STATE

Some sort of error action?
*/

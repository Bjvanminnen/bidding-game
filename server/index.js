import { compose, createStore, applyMiddleware } from 'redux';
import Server from 'socket.io';
import createLogger from 'redux-node-logger';

import serverReducer from '../src/redux/serverReducer';
import { resolveBidsIfNecessary, readyForResolve } from '../src/redux/serverReducer';

const io = new Server(8080);
const logger = createLogger();

io.on('connection', socket => {
  // TODO - this approach stops working when we have multiple clients 
  const store = compose(
    applyMiddleware(resolveBidsIfNecessary, logger)
  )(createStore)(serverReducer);

  socket.emit('update', store.getState());
  socket.on('action', store.dispatch.bind(store));

  store.subscribe(() => {
    const state = store.getState();

    // wait for resolution before informing client
    if (readyForResolve(state)) {
      return;
    }

    socket.emit('update', store.getState());
  });

});

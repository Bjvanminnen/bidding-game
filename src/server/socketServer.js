import Server from 'socket.io';
import { readyForResolve } from '../redux/serverReducer';

import { getActiveStore, createActiveStore } from './storeManager';

var PORT = process.env.SOCKET_PORT || 8080;

const io = new Server(PORT);

console.log(`Socket server listening on port ${PORT}`);

// TODO - should really track which are still connected
let sockets = [];

io.on('connection', socket => {
  sockets.push(socket);

  console.log('connection');
  let unsubscribe = attachSocketToStore(socket, getActiveStore());

  // Note: Other connected clients are still attached to the old store
  socket.on('reset', () => {
    console.log('reset');
    unsubscribe();
    unsubscribe = attachSocketToStore(socket, createActiveStore());
    socket.emit('update', store.getState());
  });
});


function attachSocketToStore(socket, store) {
  const onAction = store.dispatch.bind(store);
  // socket.emit('update', store.getState());
  socket.on('action', onAction);

  const unsubscribeStore = store.subscribe(() => {
    const state = store.getState();

    // wait for resolution before informing client
    if (readyForResolve(state)) {
      return;
    }

    socket.emit('update', state);
  });

  return function detachSocketFomStore() {
    unsubscribeStore();
    socket.removeListener('action', onAction);
  }
}

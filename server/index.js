import Server from 'socket.io';

const io = new Server(8080);

io.on('connection', socket => {
  console.log('connected');
  socket.emit('test', 'foo');
  socket.on('action', data => console.log(data));
});

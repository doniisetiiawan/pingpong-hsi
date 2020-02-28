const io = require('socket.io').listen(4000);

io.sockets.on('connection', (socket) => {
  socket.on('joinHzz', (data) => {
    socket.username = data.username;
    socket.broadcast.emit('joinXor', {
      username: data.username,
      socket: socket.id,
    });
  });
  socket.on('pingGp', () => {
    socket.broadcast.emit('pingHm', {
      username: socket.username,
    });
  });
  socket.on('privatePing', (data) => {
    io.sockets.connected[data.socket].emit('pingHm', {
      username: data.username,
      priv: true,
    });
  });
});

io.of('/vip').on('connection', (socket) => {
  socket.on('joinHzz', (data) => {
    socket.username = data.username;
    socket.broadcast.emit('joinXor', {
      username: data.username,
      socket: socket.id,
    });
  });
  socket.on('pingGp', () => {
    socket.broadcast.emit('pingHm', {
      username: socket.username,
    });
  });
  socket.on('privatePing', (data) => {
    io.of('/vip').connected[data.socket].emit('pingHm', {
      username: data.username,
      priv: true,
    });
  });
});

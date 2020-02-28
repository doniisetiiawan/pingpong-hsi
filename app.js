const io = require('socket.io').listen(4000);

io.on('connection', (socket) => {
  socket.on('join', (data) => {
    socket.broadcast.emit('userJoined', data);
    socket.username = data.username;
  });
  socket.on('pingx', () => {
    socket.broadcast.emit('userPing', {
      username: socket.username,
    });
  });
  socket.on('disconnect', () => {
    socket.broadcast.emit('userDisconnect', {
      username: socket.username,
    });
  });
});

const io = require('socket.io').listen(4000);

io.sockets.on('connection', (socket) => {
  socket.on('joinGuo', (data) => {
    socket.username = data.username;
    socket.join(data.room);
    socket.broadcast.to(data.room).emit('joinAze', {
      username: data.username,
      socket: socket.id,
      room: data.room,
    });
  });
  socket.on('pingPma', (data) => {
    socket.broadcast.to(data.room).emit('pingCcm', {
      username: socket.username,
      room: data.room,
    });
  });
  socket.on('privatePing', (data) => {
    io.sockets.connected[data.socket].emit('pingCcm', {
      username: socket.username,
      priv: true,
      room: data.room,
    });
  });
});

const io = require('socket.io').listen(4000);

io.on('connection', (socket) => {
  socket.on('join', (data) => {
    io.emit('userJoined', data);
  });
  socket.on('ping', (data) => {
    io.emit('ping', data);
  });
});

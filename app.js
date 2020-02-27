const io = require('socket.io').listen(4000);

io.sockets.on('connection', (socket) => {
  socket.emit('ping');
  socket.on('pong', (data) => {
    console.log('pong');
  });
});

const io = require('socket.io').listen(4000);

io.on('connection', (socket) => {
  socket.on('join', (data) => {
    socket.broadcast.emit('userJoined', data);
    socket.username = data.username;
  });
  socket.on('ping', (data, done) => {
    socket.broadcast.emit('ping', data);
    data.username = socket.username;
    done('ack');
  });
});

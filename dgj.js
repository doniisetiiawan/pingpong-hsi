const socket = io.connect('http://localhost:4000');
const $username = $('#username');
const $ping = $('#ping');
const $info = $('#info');

const addLi = (message) => {
  $info.append(`<li>${message}</li>`);
};

$username.on('change', () => {
  socket.emit('join', { username: $username.val() });
});

socket.on('userJoined', (data) => {
  addLi(`${data.username} has joined`);
});

$ping.on('click', () => {
  socket.emit('pingx', { username: $username.val() });
});

socket.on('userPing', (data) => {
  addLi(`${data.username} has pinged!`);
});

socket.on('userDisconnect', (data) => {
  if (data.username != null) {
    addLi(`${data.username} has left :(`);
  }
});

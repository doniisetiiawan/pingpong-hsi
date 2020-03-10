const socket = io.connect('http://localhost:4000');
const vip = io.connect('http://localhost:4000/vip');
const defaultArea = $('.default');
const vipArea = $('.vip');
const $username = $('#username');

const createButton = (user) => `<li>${user.username} <button class="private_ping" data-username="${user.username}" data-socket="${user.socket}">Ping Me</button></li>`;

const wireEvents = (area, socketio) => {
  const users = area.find('.users');
  const events = area.find('.events');

  area.on('click', (e) => {
    if (e.target.className === 'join') {
      socketio.emit('joinHzz', {
        username: $username.val(),
      });
    } else if (e.target.className === 'ping') {
      socketio.emit('pingGp');
    } else if (e.target.className === 'private_ping') {
      socketio.emit('privatePing', {
        username: e.target.getAttribute('data-username'),
        socket: e.target.getAttribute('data-socket'),
      });
    }
  });

  socketio.on('joinXor', (user) => {
    users.append(createButton(user));
  });

  socketio.on('pingHm', (user) => {
    if (user.priv === undefined) {
      events.append(`<li>Ping from ${user.username}</li>`);
    } else {
      events.append(
        `<li>Ping from ${user.username} sent directly to you!</li>`,
      );
    }
  });
};

wireEvents(defaultArea, socket);
wireEvents(vipArea, vip);

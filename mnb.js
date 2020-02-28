const socket = io.connect('http://localhost:4000');

const defaultArea = $('.default');
const vipArea = $('.vip');
const $username = $('#username');

function createButton(user) {
  return `<li>${user.username}<button class="private_ping" data-socket="${user.socket}">Ping Me</button></li>`;
}

function wireEvents(area, room) {
  const users = area.find('.users');
  const events = area.find('.events');

  area.on('click', (e) => {
    if (e.target.className === 'join') {
      if ($username.val() != '') {
        socket.emit('joinGuo', {
          username: $username.val(),
          room,
        });
      }
    } else if (e.target.className === 'ping') {
      if ($username.val() != '') {
        socket.emit('pingPma', { room });
      }
    } else if (e.target.className === 'private_ping') {
      socket.emit('privatePing', {
        socket: e.target.getAttribute('data-socket'),
        room,
      });
    }
  });

  socket.on('joinAze', (user) => {
    if (user.room === room) users.append(createButton(user));
  });

  socket.on('pingCcm', (user) => {
    if (user.room === room) {
      if (user.priv === undefined) {
        events.append(
          `<li>Ping from ${user.username}</li>`,
        );
      } else {
        events.append(
          `<li>Ping from ${user.username} sent directly to you!</li>`,
        );
      }
    }
  });
}

wireEvents(defaultArea, '');
wireEvents(vipArea, 'vip');

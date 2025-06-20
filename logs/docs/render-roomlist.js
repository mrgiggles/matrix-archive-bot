
"use strict";
let rooms = [{"historical":false,"room":"SpiderMonkey"}];

function sanitizeRoomName(room) {
  if (room.startsWith('#')) {
    room = 'irc-' + room;
  }
  return room.replace(/ /g, '_').replace(/#/g, '');
}
function renderRoom(room, current) {
  return `<li><a href="${current === 'index' ? '' : '../'}${sanitizeRoomName(room)}/"${room === current ? ' class="current-room"' : ''}>${room}</a></li>`;
}
function renderRawRoomList(rooms, room) {
  // someday, partition
  let historicalRooms = rooms.filter(r => r.historical).map(r => r.room);
  let activeRooms = rooms.filter(r => !r.historical).map(r => r.room);

  if (historicalRooms.length === 0) {
    return `
<ul class="room-list">
${activeRooms.map(r => renderRoom(r, room)).join('\n')}
</ul>
`;
  } else {
    return `
<div class="room-list-wrapper">Active:<br>
<ul class="room-list">
${activeRooms.map(r => renderRoom(r, room)).join('\n')}
</ul>
</div>
<br>
<div class="room-list-wrapper">Historical:<br>
<ul class="room-list">
${historicalRooms.map(r => renderRoom(r, room)).join('\n')}
</ul>
</div>
`;
  }
}

addEventListener('DOMContentLoaded', () => {
  document.querySelector('.all-rooms').innerHTML = renderRawRoomList(rooms, room);
});

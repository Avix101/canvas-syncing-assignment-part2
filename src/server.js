const http = require('http');
const app = require('express')();

// Allows for path resolution, which is required by express
const path = require('path');

const server = http.Server(app);
const io = require('socket.io')(server);

const port = process.env.PORT || process.env.NODE_PORT || 3000;

server.listen(port);

app.get('/', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/../client/index.html`));
});

const onAddObject = (socket) => {
  socket.on('addObject', (data) => {
    const message = data;
    message.object.color = 'red';
    io.sockets.in('room1').emit('addObject', message);
  });
};

io.on('connection', (socket) => {
  socket.join('room1');
  onAddObject(socket);
});

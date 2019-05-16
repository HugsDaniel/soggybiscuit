// Dependencies
const express   = require('express');
const http      = require('http');
const path      = require('path'); // Charge le middleware de sessions
const socketIO  = require('socket.io');

const app       = express();
const server    = http.Server(app);
const io        = socketIO(server);

app.set('port', 8080);
app.use('static', express.static(__dirname + '/static'));

// Routing

// var io = require('socket.io').listen(server);

app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'text/plain');
  res.status(404).send('Page introuvable !');
});

server.listen(8080, () => {
  console.log('Starting server on port 8080')
});

io.sockets.on('connection', (socket) => {
  socket.emit('message', 'Lol');
  // socket.on('username', (username) => {
  //   socket.username = username;
  //   socket.broadcast.emit('new_user', username);
  // })
  //
  // socket.on('message', (message) => {
  //   socket.emit('message', { message: message, username: socket.username });
  //   socket.broadcast.emit('message', { message: message, username: socket.username });
  // });
  //
  // socket.on('cuming', () => {
  //   socket.emit('cum', "Tu es venu, bien joué !");
  //   socket.broadcast.emit('cum', socket.username + " est venu sur le biscuit !");
  // });
});

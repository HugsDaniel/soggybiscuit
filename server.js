// Dependencies
const express   = require('express');
const http      = require('http');
const path      = require('path'); // Charge le middleware de sessions
const socketIO  = require('socket.io');

const app       = express();
const server    = http.Server(app);
const io        = socketIO(server);

app.set('port', 8080);
app.use(express.static('static'));

// Routing

app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'text/plain');
  res.status(404).send('Page introuvable !');
});

// Server

server.listen(8080, () => {
  console.log('Starting server on port 8080')
});

// Events
let players = {};

io.sockets.on('connection', (socket) => {
  socket.on('newPlayer', (data) => {
    socket.username = data.username;
    socket.position = Object.keys(io.sockets.sockets).length - 1;
    socket.cumImgSrc = getCumImgSrc(socket.position);
    socket.cockImgSrc = getCockImgSrc(socket.position);

    players[socket.id] = {
      position: socket.position,
      cumImgSrc: socket.cumImgSrc,
      cockImgSrc: socket.cockImgSrc,
      username: socket.username
    }

    io.emit('welcome', { username: socket.username });
    io.emit('state', players);
  })

  socket.on('message', (message) => {
    io.emit('message', { message: message, username: socket.username });
  });

  socket.on('cuming', () => {
    socket.emit('cum', { message: "Tu es venu, bien joué !", cumImgSrc: socket.cumImgSrc });
    socket.broadcast.emit('cum', { message: socket.username + " est venu sur le biscuit !", cumImgSrc: socket.cumImgSrc });
  });

  socket.on('disconnect', () => {
    delete players[socket.id];
    io.emit('goodbye', { username: socket.username });
  })
});

// Methods

const getCumImgSrc = (index) => {
  cumSrcs = [
    "images/blueCum.png",
    "images/greenCum.png",
    "images/pinkCum.png",
    "images/yellowCum.png"
  ]

  return cumSrcs[index];
}


const getCockImgSrc = (index) => {
  cockSrcs = [
    "images/blueCock.png",
    "images/greenCock.png",
    "images/pinkCock.png",
    "images/yellowCock.png"
  ]

  return cockSrcs[index];
}

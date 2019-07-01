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
  socket.on('username', (data) => {
    socket.username = data.username;
    socket.cumImgSrc = getCumImgSrc(Object.keys(io.sockets.sockets).length - 1);
    socket.imageSrc = data.imageSrc;
    io.emit('new_player', { cumImgSrc: socket.cumImgSrc, username: socket.username });
  })

  socket.on('message', (message) => {
    socket.emit('message', { message: message, username: socket.username });
    socket.broadcast.emit('message', { message: message, username: socket.username });
  });

  socket.on('cuming', () => {
    socket.emit('cum', { message: "Tu es venu, bien joué !", cumImgSrc: socket.cumImgSrc });
    socket.broadcast.emit('cum', { message: socket.username + " est venu sur le biscuit !", cumImgSrc: socket.cumImgSrc });
  });
});


const getCumImgSrc = (index) => {
  cumSrcs = [
    "images/blueCum.png",
    "images/greenCum.png",
    "images/pinkCum.png",
    "images/purpleCum.png",
    "images/yellowCum.png"
  ]

  return cumSrcs[index];
}

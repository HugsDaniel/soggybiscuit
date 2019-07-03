const socket    = io.connect('http://localhost:8080');

// Events

socket.on('cum', (data) => {
  displayWinMsg(data.message);
  splashCum(data.cumImgSrc);
})

socket.on('losing', (data) => {
  alert(data.message + 'a perdu ! Il doit manger la biscotte ;)')
})

// Methods

const canvas      = document.getElementById("canvas");
const context     = canvas.getContext("2d");
const img         = new Image();
let counter       = 0;
let running       = false;

img.src = "images/biscuit.png";
img.onload = () => {
  context.drawImage(img,
    0,
    0,
    canvas.width,
    canvas.height);
}

document.addEventListener('keydown', (event) => {
  const keyName = event.key;
  setDeslide();

  if (keyName == 'b') {
    if (counter < 50) {
      counter ++;
      slideBar();

    } else {
      socket.emit('cuming');
    }
  }
})

const setDeslide = () => {
  if (running === false) {
    window.setInterval(() => {
      counter--;
      slideBar(counter);
    }, 1000 / 2)

    running = true;
  }
}

const slideBar = () => {
  const slider = document.querySelector('#slider');
  slider.style.width = `${counter * 12}px`
}

const displayWinMsg = (message) => {
  const div = document.createElement('div');
  div.style.height = "30px";
  div.innerHTML = message;

  const messages = document.querySelector('#messages');

  messages.appendChild(div)
}

const splashCum = (cumImgSrc) => {
  const cum = new Image();
  cum.src = cumImgSrc;

  cum.onload = () => {
    context.drawImage(
      cum,
      canvas.width / getRandomInt(3) - img.width / getRandomInt(3),
      canvas.height / getRandomInt(3) - img.height / getRandomInt(3),
      cum.width / 3,
      cum.height / 3
    );
  }
}

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max)) + 1;
}

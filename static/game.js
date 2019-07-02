const socket    = io.connect('http://localhost:8080');

// Events

socket.on('cum', (data) => {
  splashCum(data);
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
    if (counter < 100) {
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
  slider.style.width = `${counter * 6}px`
}

const splashCum = (data) => {
  const cum = new Image();
  cum.src = data.cumImgSrc;

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

const username  = prompt('Quel est votre pseudo ?');

// Events

socket.emit('newPlayer', { username: username });
document.title = username + ' - ' + document.title;

socket.on('welcome', (data) => {
  const div = document.createElement('div');
  div.style.height = "30px";
  div.innerHTML = `<strong>${data.username} rejoint la partie !</strong>`

  const messages = document.querySelector('#messages');

  messages.appendChild(div)
});

socket.on('goodbye', (data) => {
  const div = document.createElement('div');
  div.style.height = "30px";
  div.innerHTML = `<strong>${data.username} a quitté la partie !</strong>`

  const messages = document.querySelector('#messages');

  messages.appendChild(div)
});

socket.on('state', (players) => {
  for (var id in players) {
    var player = players[id];
    displayCock(player.cockImgSrc, player.position)
  }
})

// Methods

const displayCock = (imgSrc, position) => {
  const penisImg = new Image();
  penisImg.src = imgSrc;
  penisImg.onload = () => {
    context.save();

    if (position === 0) {
      context.translate(600, 300);
      context.rotate(- Math.PI / 2);
    } else if (position === 1) {
      context.translate(0, 300);
      context.rotate(Math.PI / 2);
    } else if (position === 2) {
      context.translate(300, 0);
      context.rotate(Math.PI / 1);
    } else if (position === 3) {
      context.translate(300, 600);
      context.rotate(Math.PI / 0);
    }

    context.drawImage(penisImg, -penisImg.width / 2, -penisImg.height / 2);
    context.restore();
  }
}

const socket    = io.connect('http://localhost:8080');
const username  = prompt('Quel est votre pseudo ?');

const displayCock = (color) => {
  const penisImg = new Image();
  penisImg.src = "images/penis.png";
  penisImg.onload = () => {
    context.drawImage(penisImg,
      canvas.width / 2 - penisImg.width / 2,
      canvas.height / 2 - penisImg.height / 2);
  }
}

socket.emit('username', { username: username });
document.title = username + ' - ' + document.title;

socket.on('new_player', (data) => {
  // alert(data.username + ' vient de se connecter au chat avec la couleur : ' + data.color);
  // displayCock(data.color);
});

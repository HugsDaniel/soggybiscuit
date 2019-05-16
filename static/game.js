const socket      = io();
// const username    = prompt('Quel est votre pseudo ?');
// const beatButton  = document.getElementById('beat');
// const canvas      = document.getElementById("canvas");
// const context     = canvas.getContext("2d");
// const img         = new Image();
// let counter       = 0;
//
// img.src = "biscuit.png";
// img.onload = () => {
//   context.drawImage(img,
//     canvas.width / 2 - img.width / 2,
//     canvas.height / 2 - img.height / 2);
// }
//
// socket.emit('username', username);
// document.title = username + ' - ' + document.title;
//
// document.getElementById('form').addEventListener('submit', (event) => {
//   emitMessage();
//   event.preventDefault();
// });
//
// beatButton.addEventListener('click', () => {
//   if (counter < 3) {
//     counter = counter + 1;
//   } else {
//     socket.emit('cuming');
//   }
// })
//
// socket.on('new_user', (username) => {
//   // alert(username + ' vient de se connecter au chat !');
// });
//
// socket.on('cum', (message) => {
//   // alert(message);
//   splashCum();
// })
//
// const splashCum = (data) => {
//   const cum = new Image();
//
//   cum.src = "cum.png";
//   cum.onload = () => {
//     context.drawImage(
//       cum,
//       canvas.width / 2 - img.width / 2,
//       canvas.height / 2 - img.height / 2,
//       cum.width / 2,
//       cum.height / 2
//     );
//   }
// }
//
//
socket.on('message', (data) => {
  console.log(data);
  // insertMessage(data);
});
//
// const emitMessage = () => {
//   const inputField = document.getElementById('message');
//   socket.emit('message', inputField.value);
//   inputField.value = "";
// }
//
// const insertMessage = (data) => {
//   const messagesDiv = document.getElementById('messages');
//   const newMessage = document.createElement('div');
//   newMessage.innerHTML = '<p><strong>' + data.username + '</strong> - ' + data.message + '</p>';
//   messagesDiv.prepend(newMessage);
// };
//

// Cliquer sur 'beat'
// incrémenter un compteur
// un fois le compteur plein, venir sur le Biscuit
// une fois tous moins un venu, prévenir du perdant
//

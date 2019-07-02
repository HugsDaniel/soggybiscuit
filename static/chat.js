// Events

socket.on('message', (data) => {
  insertMessage(data);
});

// Methods

document.getElementById('form').addEventListener('submit', (event) => {
  emitMessage();
  event.preventDefault();
});

const emitMessage = () => {
  const inputField = document.getElementById('message');
  socket.emit('message', inputField.value);
  inputField.value = "";
}

const insertMessage = (data) => {
  const messagesDiv = document.getElementById('messages');
  const newMessage = document.createElement('div');
  newMessage.innerHTML = '<p><strong>' + data.username + '</strong> - ' + data.message + '</p>';
  messagesDiv.prepend(newMessage);
};

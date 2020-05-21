/*jshint esversion: 6 */

const socket = io('http://localhost:3000');
const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');

const name = prompt('What is your name?');
appendInfo('You joined');
socket.emit('new-user', name);

socket.on('chat-message', data => {
  appendMsgOther(`${data.name}: ${data.message}`,data.sentiment);
  console.log(`${data.sentiment}`);
});

socket.on('user-connected', name => {
  appendInfo(`${name} connected`);
});

socket.on('user-disconnected', name => {
  appendInfo(`${name} disconnected`);
});

messageForm.addEventListener('submit', e => {
  e.preventDefault();
  const message = messageInput.value;
  appendMsgSelf(`${message}`);
  socket.emit('send-chat-message', message);
  messageInput.value = '';
});

function appendMsgSelf(message) {
  const messageDiv = document.createElement('div');
  messageDiv.setAttribute("class","container text-right my-3 p-1"); 

  const messageText = document.createElement('span');
  messageText.setAttribute("class","bg-primary rounded py-2 px-3 text-light");
  messageText.innerText = message;

  messageDiv.append(messageText);
  messageContainer.append(messageDiv);
}

function appendMsgOther(message,sentiment) {
  const messageDiv = document.createElement('div');
  console.log(sentiment);
  messageDiv.setAttribute("class",`container text-left my-3 p-1`);

  const messageText = document.createElement('span');
  messageText.setAttribute("class",`py-2 px-3 text-light rounded bg-${sentiment}`);
  messageText.innerText = message;

  messageDiv.append(messageText);
  messageContainer.append(messageDiv);
}

function appendInfo(message) {
  const messageDiv = document.createElement('div');
  messageDiv.setAttribute("class","container w-50 text-center my-4 py-1 chat-info mx-auto");

  const messageText = document.createElement('span');
  messageText.setAttribute("class","bg-light text-primary rounded py-3 px-3");
  messageText.innerText = message;

  messageDiv.append(messageText);
  messageContainer.append(messageDiv);
}
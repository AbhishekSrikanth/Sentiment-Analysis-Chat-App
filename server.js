/*jshint esversion: 6 */

const io = require('socket.io')(3000);

const users = {};

io.on('connection', socket => {
  socket.on('new-user', name => {
    users[socket.id] = name;
    socket.broadcast.emit('user-connected', name);
  });
  socket.on('send-chat-message', message => {

    var fromPy = "";
    var spawn = require("child_process").spawn;
    var process = spawn('python', ["./py-scripts/predict.py", message]);
    process.stdout.on('data', function (data) {
      console.log("Python answered");
      console.log(data.toString());
      fromPy = data.toString();
      socket.broadcast.emit('chat-message', {
        message: message,
        name: users[socket.id],
        sentiment: fromPy
      });
    });


    process.stderr.on('data', (data) => {
      console.error(`child stderr:\n${data}`);
    });
  });
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id]);
    delete users[socket.id];
  });
});
//jshint esversion: 6

const net = require('net');

let counter = 0;
let server = net.createServer((socket) => {

  socket.on('data', (chunk) => {
    counter++;
    socket.write('the current message count is ' + counter);
  });
});

server.listen(9001, '0.0.0.0',  () => {
  console.log('opened sever on ' + server.address());
});
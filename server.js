//jshint esversion: 6

const net = require('net');

let counter = 0;
let server = net.createServer((socket) => {

  socket.on('data', (chunk) => {
    counter++;
    //console.log('message count is ' + counter);
    //socket.write(`Messaging from client: ${chunk}`);
    console.log(`Client: ${chunk}`);
    process.stdin.pipe(socket);

  });
});

server.listen(9000, '0.0.0.0',  () => {
  console.log('opened sever on ', server.address());
});
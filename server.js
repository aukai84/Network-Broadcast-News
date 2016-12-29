//jshint esversion: 6

const net = require('net');

let clients = [];
let counter = 0;
let server = net.createServer((socket) => {

  //identify each client by address...will try to add username
    socket.name = socket.remoteAddress + ':' + socket.remotePort;
    //add new clients to clients array
    clients.push(socket);
    socket.write(`Welcome ${socket.name} to the sever!\n`);

  socket.on('data', (chunk) => {
    counter++;
    //socket.write(`Message from ${socket.name} > ${chunk}`);
    process.stdout.write(`Message from ${socket.name} > ${chunk}`);
    broadcast(`Message from ${socket.name} > ${chunk}`, socket);

    function broadcast(message, sender) {
      clients.forEach((client) => {
        if(client === sender) return;
        client.write(message);
      });
    }

  });
});

server.listen(9000, '0.0.0.0',  () => {
  console.log('opened sever on ', server.address());
});
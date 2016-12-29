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
    broadcast(`${socket.name} has joined the server \n`);
    //broadcast function to send messages to all clients except sender
    function broadcast(message) {
      for(let i = 0; i < clients.length; i++){
        if(clients[i] !== socket){
          clients[i].write(message);
        }
      }
    }

  socket.write("Please type in a username!");

  socket.on('data', (chunk) => {

    socket.name = chunk;
    counter++;
    //socket.write(`Message from ${socket.name} > ${chunk}`);
    process.stdout.write(`BROADCAST MESSAGE FROM ${socket.name} > ${chunk}`);
    broadcast(`Message from ${socket.name} > ${chunk}`);
    //removes client from array on end, broadcast message letting clients know someone left
    socket.on('end', () => {
      clients.splice(clients.indexOf(socket), 1);
      broadcast(`${socket.name} has left the chat \n`);
    });

  });
});

server.listen(9000, '0.0.0.0',  () => {
  console.log('opened sever on ', server.address());
});
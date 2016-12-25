//jshint esversion: 6
const net = require('net');

let client = net.createConnection(9000, 'localhost');

client.on('connect', (chunk) => {
  console.log("connected");
  process.stdin.pipe(client);
});

client.on('data', (chunk) => {
  console.log(`message from the server: ${chunk}`);
});

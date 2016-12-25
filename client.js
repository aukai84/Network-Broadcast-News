//jshint esversion: 6
const net = require('net');

let client = net.createConnection(9001, 'localhost');

client.on('connect', () => {
  console.log("connected");
  process.stdin.pipe(client);
});

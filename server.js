// Create express
const express = require('express');

// Create server
const server = express();

// Middleware for JSON
server.use(express.json());

// Routes

server.get('/', (req, res) => {
  res.send('This is working');
});

module.exports = server;

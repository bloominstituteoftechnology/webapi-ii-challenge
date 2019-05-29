const express = require('express');
const server = express();

const db_router = require('./posts/database-router');

server.use(express.json());

// Server running initial GET
server.get('/', (req, res) => {
  res.send(`<h1>Hello to the world, from Lambda School Students</h1>`);
});

// For shorthand links
server.use('/api/posts', db_router);

// fall back
server.use(function(req, res) {
  res.status(404).send(`No such page exits.`);
});
module.exports = server;

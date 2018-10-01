// import your node modules
const express = require('express');
const server = express();
const knex = require('knex');
const knexConfig = require('./knexfile.js');

const db = require('./data/db.js');

// add your server code starting here

// quick text display to make sure everything loads properly

server.get('/', (req, res) => {
  res.send('Testing server.');
});

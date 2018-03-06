const bodyParser = require('body-parser');
const express = require('express');

const STATUS_SUCCESS = 200;
const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];

const server = express();
server.use((req, res, next) => {
  console.log(`You got a Request: ${req}`);
  next();
});

// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

server.get('/', (req, res) => {
  res.status(STATUS_SUCCESS);
  res.send({ Success: STATUS_SUCCESS });
});
// TODO: your code to handle requests

module.exports = { posts, server };

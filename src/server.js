const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [
  {
    title: 'Keep on walking...',
    contents: 'More mind-boggling stuff.',
    id: 0
  },
  {
    title: 'Just another',
    contents: 'Even more stuff.',
    id: 1
  }
];

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests

module.exports = { posts, server };

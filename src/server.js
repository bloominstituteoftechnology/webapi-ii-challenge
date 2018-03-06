const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;
const STATUS_USER_SUCCESS = 200;
// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests

server.get('/posts', (req, res) => {

});
server.post('/posts', (req, res) => {

});
server.put('/', (req, res) => {

});
server.delete('/', (req, res) => {

});

module.exports = { posts, server };

const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;

server.get('/greet-me', (req, res) => {
  res.send('<h1>Hello!'</h1>);
});

server.listen(3000);

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.


title: "The post title",
contents: "The post contents"
}

const posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests

module.exports = { posts, server };



GET /posts` POST /posts` PUT /posts`
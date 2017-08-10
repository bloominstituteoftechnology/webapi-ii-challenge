const bodyParser = require('body-parser');
const express = require('express');

const fs = require('fs');

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests

// dummy pages
server.get('/hello', (req, res) => {
  res.send('<h1>Hello!</h1>');
});
server.get('/', (req, res) => {
  fs.readFile('index.html', 'utf8', (err, contents) => {
    if (err) {
      throw err;
    }
    res.send(contents);
  });
});

// req = request
// res = response
// when the server receives
// i.e. when the client send
// an HTTP GET request
// to GET a resource at the /posts location
// invoke the request, response callBack
server.get('/posts', (req, res) => {
  // default to display entire posts array
  // res.send('HTTP GET: "Hello!"');
  // console.log('server.get('/posts', ... ) YAY')
  res.json({ posts });
});

server.post('/posts', (req, res) => {
  /* add a post to posts array
  {
    title: "The post title",
    contents: "The post contents"
  }
  */
  const title = req.body.title;
  const content = req.body.content;

  // console.log('server.post('/posts',, ... ) YAY');
  // res.send('HTTP POST something?');
  res.json({ posts })
});

server.put('/posts', (req, res) => {
  res.send('HTTP PUT something?');
});

server.delete('/posts', (req, res) => {
  res.send('HTTP DELETE something?');
});

module.exports = { posts, server };

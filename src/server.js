const bodyParser = require('body-parser');
const express = require('express');

var request = require('request');

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [
    { id: 1, title: 'Post1', contents: 'Content for Post1' },
    { id: 2, title: 'Post2', contents: 'Content for Post2' },
    { id: 3, title: 'Post3', contents: 'Content for Post3' },
    { id: 4, title: 'Post4', contents: 'Content for Post4' },
    { id: 5, title: 'Post5', contents: 'Content for Post5' },
    { id: 6, title: 'Post6', contents: 'Content for Post6' },
    { id: 7, title: 'Post7', contents: 'Content for Post7' },
];

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests

server.get('/posts', (req, res) => {
  if (posts.length === 0) {
    res.status(200).json([]);
    return;
  }
  const term = req.query.term;
  if (term) {
    const filtered = posts.filter((post) => {
      return post.title.includes(term) || post.contents.includes(term);
    });
    res.status(200).json(filtered);
  } else {
    res.status(200).json(posts);
  }
});

server.post('/posts', (req, res) => {
  const newPost = req.body;
  if (newPost.title && newPost.contents) {
    newPost.id = posts.length;
    posts.push(newPost);
    res.status(200).json(newPost);
  } else {
    res.status(STATUS_USER_ERROR).json({ error: 'missing title or contents' });
  }
});

server.put('/posts', (req, res) => {
  const newPost = req.body;
  if (newPost.title && newPost.contents && newPost.id) {
    const index = posts.findIndex((post) => {
      return post.id === newPost.id;
    });
    if (index === -1) {
      res.status(STATUS_USER_ERROR).json({ error: 'the id doesn\'t correspond to a valid post' });
      return;
    }
    posts.splice(index, 1, newPost);
    res.status(200).json(newPost);
  } else {
    res.status(STATUS_USER_ERROR).json({ error: 'missing title or contents or id' });
  }
});

server.delete('/posts', (req, res) => {
  const id = req.body.id;
  if (id !== undefined) {
    const index = posts.findIndex((post) => {
      return post.id === id;
    });
    if (index === -1) {
      res.status(STATUS_USER_ERROR).json({ error: 'id doesn\'t corresponds to a valid post' });
      return;
    }
    posts.splice(index, 1);
    res.status(200).json({ success: true });
  } else {
    res.status(STATUS_USER_ERROR).json({ error: 'there is no id provided' });
  }
});




server.get('/', (req, res) => {
    request('http://www.google.com/search?q=trash', function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
        res.send(body);
    });    
});




module.exports = { posts, server };

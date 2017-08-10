const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];
let idCounter = 0;

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests
server.post('/posts', (req, res) => {
  const singlePost = req.body.singlePost;
  if (!singlePost.title || !singlePost.contents) {
    res.status(STATUS_USER_ERROR);
    res.json({error: 'Please provide a title and contents...'});
    return;
  }
  singlePost.ID = idCounter;
  posts.push(singlePost);
  idCounter += 1;
  res.json(singlePost);
});

server.get('/posts', (req, res) => {
  res.json({posts})
})

server.delete('/posts', (req, res) => {
  const deletePost = req.body.deletePost.ID; // delete req.body.deletePost.ID
  if (!deletePost) {
    res.status(STATUS_USER_ERROR);
    res.json({error: 'Please include ID.'});
    return;
  }

  posts.forEach((p) => {
    if (p.ID == deletePost) {
      // console.log(p);
      posts.splice(p.ID, 1);
      res.json({success: true})
      return;
    }
  })

  res.status(STATUS_USER_ERROR);
  res.json({error: 'ID provided is invalid.'})
})

console.log('server listening on port 3000');

module.exports = { posts, server };

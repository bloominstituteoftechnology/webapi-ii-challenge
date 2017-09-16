const bodyParser = require('body-parser'); // always need this
const express = require('express'); // always need this

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];
let idCounter = 0;

const server = express(); // always need this
// to enable parsing of json bodies for post requests
server.use(bodyParser.json()); // always need this

// TODO: your code to handle requests
server.post('/posts', (req, res) => {
  const singlePost = req.body.singlePost;
  if (!singlePost.title || !singlePost.contents) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Please provide a title and contents...' });
    return;
  }
  singlePost.ID = idCounter;
  posts.push(singlePost);
  idCounter += 1;
  res.json(singlePost);
});

server.get('/posts', (req, res) => {
  const term = req.query.term;
  if (term) {
    const matchedPosts = posts.filter((post) => {
      return (post.title.includes(term) || post.contents.includes(term));
    });
    if (matchedPosts.length < 1) {
      res.json(posts);
      return;
    } else {
      res.json(matchedPosts);
      return;
    };
  }
  res.json(posts);
});

server.put('/posts', (req, res) => {
  const updatedPost = req.body.updatePost;
  if (!updatedPost.ID || !updatedPost.title || !updatedPost.contents) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Please provide ID, title, and contents' });
    return;
  }

  const targetedPost = posts.find((post) => {
    return (post.ID === parseInt(updatedPost.ID, 10));
  });
  if (targetedPost) {
    targetedPost.title = updatedPost.title;
    targetedPost.contents = updatedPost.contents;
    res.json({ targetedPost });
  } else {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'ID not found in the data set' });
  }
});

server.delete('/posts', (req, res) => {
  const deletePost = req.body.deletePost.ID; // delete req.body.deletePost.ID
  if (!deletePost) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Please include ID.' });
    return;
  }

  posts.forEach((p, index) => {
    if (p.ID === deletePost) {
      // console.log(p);
      posts.splice(index, 1);
      res.json({ success: true });
      return;
    }
  });

  res.status(STATUS_USER_ERROR);
  res.json({ error: 'ID provided is invalid.' });
});

// console.log('server listening on port 3000');

module.exports = { posts, server };

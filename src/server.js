const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];
let postId = 0;
const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests


server.get('/posts', (req, res) => {
  const term = req.query.term;
  if (term) {
    const filtered = posts.filter((post) => {
      return post.title.includes(term) || post.contents.includes(term);
    });
    res.json(filtered);
  } else {
    res.json(posts);
  }
});

server.post('/posts', (req, res) => {
  const title = req.body.title;
  const contents = req.body.contents;
  if (!title || !contents) {
    res.status(STATUS_USER_ERROR).json({ error: 'post must contain title and body in order to post' });
  }
  const post = { title, contents, id: postId };
  posts.push(post);
  postId++;
  res.json(post);
});

server.put('/posts', (req, res) => {
  const { title, contents, id } = req.body;
  if (!title || !contents || !id) {
    res.status(STATUS_USER_ERROR).json({ error: 'request must contain title and body  and id in order to edit' });
  }
  const post = {};
  posts.forEach((postsItem) => {
    if (postsItem.id === id) {
      postsItem.title = title;
      postsItem.contents = contents;
      post.title = title;
      post.contents = contents;
      post.id = id;
    }
  });
  if (Object.keys(post).length === 0) {
    res.status(STATUS_USER_ERROR).json({ error: 'no post with matching id found' });
  }
  res.json(post);
});

server.delete('/posts', (req, res) => {
  const { id } = req.body;
  if (!id && id !== 0) {
    res.status(STATUS_USER_ERROR).json({ error: 'need a valid id' });
  }
  let different = 0;
  if (typeof id !== 'number' || id < 0 || id >= postId) {
    res.status(STATUS_USER_ERROR).json({ error: 'need a valid id' });
  }
  const filteredData = posts.filter((post) => {
    if (post.id || post.id === 0) {
      if (post.id !== id) different++;
      return post.id !== id;
    }
    return post;
  });
  if ((filteredData.length === posts.length && different > 0) || different === 0) {
    res.status(STATUS_USER_ERROR).json({ error: 'no post with matching id found' });
  }
  for (let i = 0; i < posts.length; i++) {
    if (i >= filteredData.length) {
      posts.splice(i, 1);
    } else if (posts[i].id !== filteredData[i].id) {
      posts.splice(i, 1);
    }
  }
  res.json(posts);
});

module.exports = { posts, server };

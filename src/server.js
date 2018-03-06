const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;
const STATUS_OK = 200;
const STATUS_NOT_FOUND = 404;
const STATUS_SERVER_ERROR = 500;
const posts = [];
let postCounter = 0;
const server = express();
server.use(bodyParser.json());

server.post('/posts', (req, res) => {
  const { title, contents } = req.body;
  if ((!title) || (!contents)) {
    res
      .status(STATUS_USER_ERROR)
      .json({ error: 'You must provide a title and contents!' });
    return;
  }
  const id = postCounter;
  const post = { id, title, contents };
  postCounter++;
  posts.push(post);
  res.json(post);
});

server.get('/posts', (req, res) => {
  const search = req.query.term;
  res.json(posts.filter((post) => {
    if (!search) return true;
    if (post.title.includes(search)) {
      return true;
    }
    if (post.contents.includes(search)) {
      return true;
    }
    return false;
  }));
});

server.put('/posts', (req, res) => {
  const { title, contents, id } = req.body;
  if ((!title) || (!contents) || (!id)) {
    res
      .status(STATUS_USER_ERROR)
      .json({ error: 'You must provide title, contents, and id!' });
    return;
  }
  if (id > postCounter) {
    res
    .status(STATUS_USER_ERROR)
    .json({ error: 'You must provide correct ID.' });
    return;
  }
  let postIndex = 0;
  const postToUpdate = posts.filter((item, i) => {
    if (item.id === id) {
      postIndex = i;
      return true;
    }
    return false;
  });
  if (postToUpdate.length === 0) {
    res
      .status(STATUS_USER_ERROR)
      .json({ error: 'Post does not exist' });
    return;
  }
  const post = posts[postIndex];
  post.title = title;
  post.contents = contents;
  res.json(post);
});

server.delete('/posts', (req, res) => {
  const id = req.body.id;
  if (!id) {
    res
      .status(STATUS_USER_ERROR)
      .json({ error: 'You must provide an ID.' });
    return;
  }
  if (id > postCounter) {
    res
    .status(STATUS_USER_ERROR)
    .json({ error: 'You must provide valid ID.' });
    return;
  }
  let postIndex = 0;
  const postToDelete = posts.filter((post, i) => {
    if (post.id === id) {
      postIndex = i;
      return true;
    }
    return false;
  });
  if (postToDelete.length === 0) {
    res
      .status(STATUS_USER_ERROR)
      .json({ error: 'Post does not exist' });
    return;
  }
  posts.splice(postIndex, 1);
  res.json({ success: true });
});

server.listen(3000);

module.exports = { posts, server };

const bodyParser = require('body-parser');
const express = require('express');

const STATUS_OK = 200;
const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;
// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];
let id = 0;
const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// get posts and if there is a term search if the title or the contents contain the searchTerm
server.get('/posts', (req, res) => {
  const result = { status: STATUS_OK, postsFiltered: [posts] };
  res.status(result.status);
  const searchTerm = req.query.term;
  if (!searchTerm) {
    res.status(result.status);
    return res.json(posts);
  }
  const postsFiltered = [];
  posts.map((post) => {
    if (post.title.includes(searchTerm) || post.contents.includes(searchTerm)) {
      postsFiltered.push(post);
    }
    return true;
  });
  res.status(result.status);
  return res.json(postsFiltered);
});
server.post('/posts', (req, res) => {
  const title = req.body.title;
  const contents = req.body.contents;
  if (!title) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must enter a Title!' });
    return;
  }
  if (!contents) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must enter a contents' });
    return;
  }
  posts.push({ id, title, contents });
  res.status(STATUS_OK);
  res.json(posts[posts.length - 1]);
  id++;
  return;
});
// TODO: your code to handle requests
server.put('/posts', (req, res) => {
  const checkId = req.body.id;
  const newTitle = req.body.title;
  const newContents = req.body.contents;
  // let notFound = 404;
  let status = STATUS_USER_ERROR;
  let index = 0;
  if (!newTitle || !newContents) {
    res.status(status);
    res.json({ error: 'Invalid User Data' });
    return;
  }
  posts.map((post, i) => {
    if (post.id === checkId) {
      status = STATUS_OK;
      index = i;
      posts[i] = req.body;
    }
    return false;
  });
  res.status(status);
  res.json(status === STATUS_OK ? posts[index] : { error: 'Invalid User Data' });
});

module.exports = { posts, server };

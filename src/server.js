const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');

const STATUS_OK = 200;
const STATUS_NOT_FOUND = 404;
const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;


let posts = [
    { 'id': 1,
      'title': "The post title",
      'contents': "The post contents"
    }];

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

server.get('/posts', (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const contents = req.body.contents;
  const term = req.query.term;
  if (term) {
    const filteredPost = posts.filter((post) => {
      return post.title.indexOf(post) !== -1 || post.contents.indexOf(post) !== 1;
    });
    res.json(filteredPost);
  } else {
    res.json(posts);
  }
});

server.post('/posts', (req, res) => {
  const id = 2;
  const { title, contents } = req.body;
  if (!title || !contents) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'title or contents missing' });
    return;
  }
  const newPost = {
    id,
    title,
    contents 
  };
  posts.push(newPost);
  console.log(newPost);
  res.json(newPost);
});

server.put('/posts', (req, res) => {
  const postsId = req.body.id;
  const title = req.body.title;
  const contents = req.body.contents;
  if (!title || !contents || !postsId) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'title or contents or id missing' });
    return;
  }
  for (let i = 0; i < posts.length; i++) {
    if (postsId === posts[i].id) {
      posts[i].title = title;
      posts[i].contents = contents;
    //   postsId++;
      res.status(STATUS_OK).json({ title, contents, postsId });
      return;
    }
  }
  res.status(STATUS_USER_ERROR).json({ error: 'bad id ' });
});

server.delete('/posts', (req, res) => {
  const { id, title, contents } = req.body;
  const posts1 = req.params.id;
  if (!id) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'id missing' });
    return;
  }
  for (let i = 0; i < posts.length; i++) {
    if (posts1 === posts[i].id) {
      posts[i].title = 'title';
      posts[i].contents = 'contents';
      posts.splice(i, 1);
      res.status(STATUS_OK).json({ success: true });
      return;
    }
  }
  res.status(STATUS_USER_ERROR);
  res.json({ error: 'bad id' });
});
module.exports = { posts, server };

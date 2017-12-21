const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [
    { id: 0, title: 'First', contents: 'Post1' },
    { id: 1, title: 'Second', contents: 'Gouda\'s my favorite' }
];
const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests
// works
server.get('/posts', (req, res) => {
  if (req.query.term) {
    const term = req.query.term;
    res.status(200).json(posts.filter((element) => {
      return (element.title.includes(term) || element.contents.includes(term));
    }));
  }
  res.status(200).json(posts);
});

server.post('/posts', (req, res) => {
  const { title, contents } = req.body;
  if (title && contents) {
    const newPost = { title, contents, id: posts.length };
    posts.push(newPost);
    res.status(200).json(newPost);
  } else {
    res.status(STATUS_USER_ERROR).json({ error: 'needs title and content' });
  }
});

server.put('/posts', (req, res) => {
    // shorthand from lecture
  const { title, contents, id } = req.body;
  if (title && contents && id) {
    const replacementPost = { title, contents, id };
    // find if a post already has this id
    let post = posts.find(p => p.id === Number(id));
    if (post) {
      post = replacementPost;
      res.status(200).send(post);
    } else {
      res.status(STATUS_USER_ERROR).json({ error: 'not a valid post' });
    }
  } else {
    res.status(STATUS_USER_ERROR).json({ error: 'please include all needed data' });
  }
});

server.delete('/posts', (req, res) => {
  const index = req.body.id;
  const postIndex = posts.findIndex(p => p.index === Number(index));
  if (postIndex >= 0) {
    posts.splice(postIndex, 1);
    res.status(200).json({ success: true });
  } else {
    res.status(STATUS_USER_ERROR).json({ error: 'not found' });
  }
});
module.exports = { posts, server };

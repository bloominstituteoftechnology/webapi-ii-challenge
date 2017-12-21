const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());


const errorMissingParam = {
  error: 'Bad Request - missing parameters'
};

// TODO: your code to handle requests
server.get('/posts', (req, res) => {
  if (req.query.term === undefined) {
    res.status(200).json(posts);
  } else {
    res.status(200).json(posts.filter((post) => {
      return (new RegExp(req.query.term, 'gi').test(`${post.title} ${post.contents}`));
    }));
  }
});

server.post('/posts', (req, res) => {
  const post = req.body;

  if (post.title !== undefined && post.contents !== undefined) {
    const newPost = {};
    newPost.id = new Date().getTime();
    newPost.title = post.title;
    newPost.contents = post.contents;
    posts.push(newPost);

    res.status(200).send(posts);
  } else {
    res.status(422).json(errorMissingParam);
  }
});

server.put('/posts', (req, res) => {
  const post = req.body;

  if (post.id !== undefined && post.title !== undefined && post.contents !== undefined) {
    const targetIndex = posts.findIndex(item => item.id === post.id);
    if (targetIndex !== -1) {
      posts[targetIndex].title = post.title;
      posts[targetIndex].contents = post.contents;

      res.status(200).json(posts);
    } else {
      res.status(422).json(errorMissingParam);
    }
  } else {
    res.status(422).json(errorMissingParam);
  }
});

server.delete('/posts', (req, res) => {
  const post = req.body;

  if (post.id === undefined) {
    res.status(422).json(errorMissingParam);
  } else {
    const targetIndex = posts.findIndex(item => item.id === post.id);

    if (targetIndex === -1) {
      res.status(422).json(errorMissingParam);
    } else {
      posts.splice(targetIndex, 1);

      res.status(200).json({
        success: true
      });
    }
  }
});

module.exports = { posts, server };

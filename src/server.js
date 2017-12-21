const bodyParser = require('body-parser');
const express = require('express');

const errorMissingParam = {
  error: 'Bad Request - missing parameters'
  };


const STATUS_USER_ERROR = 422;

let posts = [
  {
    title: 'one',
    contents: 'I was petrified.',
    id: 0
  },
  {
    title: 'two',
    contents: 'Kept thinkin I could never live without you by my side.',
    id: 1
  },
  {
    title: 'three',
    contents: 'Then I spent so many nights just thinking how you done me wrong',
    id: 2
  },
  {
    title: 'four',
    contents: 'And I grew strong, and I learned how to get along!',
    id: 3
  }
];

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

server.get('/posts', (req, res) => {
  res.status(200).json(posts);
});

server.get('/posts/:term', (req, res) => {
  const post = posts.find(item => item.title.includes(req.params.term) || item.contents.includes(req.params.term));
  res.status(200).json(post);
});

server.post('/posts', (req, res) => {
  if (post.id !== undefined && post.contents !== undefined) {
    const newPost = {};
    newPost.id = posts.length;
    newPost.title = post.title;
    newPost.contents = post.contents;
    posts.push(newPost);

    res.status(200).json(post);
  } else {
    res.status(422).json(errorMissingParam);
  }
});

server.put('/posts', (req, res) => {
  if (post.id !== undefined && post.title !== undefined && post.contents !== undefined) {
    const targetIndex = posts.findIndex(item => item.id === post.id);
    if (targetIndex !== -1) {
      posts[targetIndex].title = post.title;
      posts[targetIndex].contents = post.contents;

      res.status(200).json(posts);
    } else {
      res.status(422).json(errorMissingParam);
    }
  }
});

server.delete('/posts/:id', (req, res) => {
  if (req.params.id && req.params.id <= posts.length) {
    posts = posts.splice(req.params.id, 1);
    res.status(200).json({ success: true });
  } else {
    res.status(404).json({ error: 'DELETE: could not find item to be deleted' });
  }
});

module.exports = { posts, server };

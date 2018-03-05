const bodyParser = require('body-parser');
const express = require('express');

const server = express();
server.use(bodyParser.json());

const STATUS_USER_ERROR = 422;

let posts = [];
let uniqueId = 1;

// helpers
const createPost = (title, contents) => {
  const post = { id: uniqueId, title, contents };
  uniqueId++;
  return post;
};

// helper function for error message handling
const handleError = (msg, res) => {
  res.status(STATUS_USER_ERROR).json(msg);
  return;
};
// function that finds obj with id in posts array
const findPost = (targetId) => {
  posts.forEach((post) => {
    if (post.id === targetId) return post;
  });
  return undefined;
};

const updatePost = (targetId, newTitle, newConents) => {
  for (let i = 0; i < posts.length; i++) {
    if (posts[i].id === targetId) {
      posts[i].title = newTitle;
      posts[i].contents = newConents;
      return posts[i];
    }
  }
};

const removePost = (targetId) => {
  posts = posts.filter(post => post.id !== targetId);
};

// checks if there is a post with a given id in posts db
const idCheck = (targetId) => {
  return posts.map(post => post.id).includes(targetId);
};

const errMsg = { error: 'Error Message' };

server.get('/posts', (req, res) => {
  const { term } = req.query;

  if (term) {
    const filteredPosts = posts.filter((post) => {
      return post.title.includes(term) || post.contents.includes(term);
    });
    res.json(filteredPosts);
  } else res.json(posts);
});

server.post('/posts', (req, res) => {
  const { title, contents } = req.body;
  const post = { title, contents };
  if (typeof title === 'string' && typeof contents === 'string') {
    const newPost = createPost(title, contents);
    posts.push(newPost);
    res.json(newPost);
  } else {
    res.status(STATUS_USER_ERROR).json(errMsg);
  }
});

server.put('/posts', (req, res) => {
  const { title, contents, id } = req.body;
  const post = { id, title, contents };

  if (typeof title === 'string' && typeof contents === 'string' && typeof id === 'number' && idCheck(id)) {
    // update post
    const updatedPost = updatePost(id, title, contents);
    res.json(updatedPost);
  } else {
    res.status(STATUS_USER_ERROR).json(errMsg);
  }
});

server.delete('/posts', (req, res) => {
  const { id } = req.body;
  if (idCheck(id)) {
    removePost(id);
    // console.log(posts);
    res.json({ success: true });
  } else res.status(STATUS_USER_ERROR).json(errMsg);
});

module.exports = { posts, server };

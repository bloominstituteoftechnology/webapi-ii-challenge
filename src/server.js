const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let nextId = 0;
let posts = {};

const getNextId = () => {
  const id = nextId;
  nextId += 1;
  return id;
};

const clearId = () => nextId = 0;

// post methods
const setPosts = newPosts => posts = { ...posts, ...newPosts };

const addPost = newPost => posts[newPost.id] = newPost;

const getPostsLength = () => Object.keys(posts).length;

const getPosts = () => ({ ...posts });

const getPostById = id => ({ ...posts[id] });

const removePost = (id) => {
  delete posts[id];
  return { success: true };
};


// getFilteredPosts -- accepts a callback, sends it a post, cb should return a boolean
// returns an object of filtered posts
const getFilteredPosts = (cb) => {
  const filteredPosts = {};
  Object.keys(posts).filter(id => cb(posts[id]))
    .forEach(id => filteredPosts[id] = posts[id]);
  return filteredPosts;
};


const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests

// GET /posts -- accepts "term" query param
server.get('/posts', (req, res) => {
  const { term } = req.query;
  if (term) {
    return res.json(getFilteredPosts((post) => {
      return post.title.indexOf(term) !== -1 ||
            post.contents.indexOf(term) !== -1;
    }));
  }
  return res.json(getPosts());
});

// POST /posts -- accepts post in request body
server.post('/posts', (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    return res.status(422).json({ error: 'Missing title and/or contents' });
  }
  return res.json(addPost({ id: getNextId(), title, contents }));
});

// PUT /posts -- accepts post in request body
server.put('/posts', (req, res) => {
  const { id, title, contents } = req.body;
  const post = getPostById(id);
  if (!post.id) {
    return res.status(422).json({ error: `post ${id} not found` });
  }
  return res.json(addPost({ id, title, contents }));
});

// DELETE /posts -- accepts post or single id in request body
server.delete('/posts', (req, res) => {
  const { id } = req.body;
  const post = getPostById(id);
  if (post.id !== 0 && !post.id) {
    return res.status(422).json({ error: `post ${id} not found` });
  }
  return res.json(removePost(id));
});


module.exports = {
  posts,
  server,
  utils: {
    clearId,
    getPosts,
    removePost
  }
};

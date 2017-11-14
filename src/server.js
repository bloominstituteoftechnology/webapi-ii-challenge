const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

const PORT = 4000;

server.listen(PORT, (error) => {
  if (error) return `<h2>Error! </h2> ${error}`;
  return `I see you on port ${PORT}`;
});

const handleErrors = (res, error) => {
  return res.status(STATUS_USER_ERROR).json(error);
};

server.get('/posts', (req, res) => {
  const term = req.query.term;
  let newPosts = [];
  if (!term) res.json(posts);
  newPosts = posts.filter((post) => {
    return post.title.includes(term) || post.contents.includes(term);
  });
  res.json(newPosts);
});

server.post('/posts', (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    return handleErrors(res, {
      error: 'Your title or content was empty',
    });
  }
  const post = {
    title,
    contents,
    id: posts.length ? posts[posts.length - 1].id + 1 : 1,
  };
  posts.push(post);

  res.status(201).json(post);
});

server.put('/posts', (req, res) => {
  const { title, contents, id } = req.body;
  if (!title || !contents || !id) {
    return handleErrors(res, {
      error: 'You must include a title, content, and and id to update',
    });
  }

  const postToUpdate = posts.findIndex(post => id === post.id);

  if (postToUpdate === -1) {
    return handleErrors(res, {
      error: 'No post found with that ID',
    });
  }

  posts[postToUpdate] = { title, contents, id };
  return res.json(posts[postToUpdate]);
});

server.delete('/posts', (req, res) => {
  const id = req.body.id;
  if (!id) {
    return handleErrors(res, {
      error: 'Must provide an ID',
    });
  }
  const postToDelete = posts.findIndex(post => id === post.id);
  if (postToDelete === -1) {
    return handleErrors(res, {
      error: 'Post not found, enter correct ID',
    });
  }
  posts.splice(postToDelete, 1);
  return res.json({ success: true });
});

module.exports = { posts, server };

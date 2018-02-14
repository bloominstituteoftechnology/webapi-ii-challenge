const bodyParser = require('body-parser');
const express = require('express');

const STATUS_SUCCESS = 200;
const STATUS_NO_CONTENT = 204;
const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];
let postId = 0;

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// POST operation
server.post('/posts', (req, res) => {
  if (!req.body.title || !req.body.contents) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must provide both a title and contents' });
  }
  const newPost = { id: postId, title: req.body.title, contents: req.body.contents };
  posts.push(newPost);
  res.status(STATUS_SUCCESS);
  res.json(newPost);
  postId++;
});

// GET operation:  GET all or just those containing specific term in title or contents
server.get('/posts', (req, res) => {
  if (req.query.term) {
    // filter to find matching posts
    const matchingPosts = posts.filter((post) => {
      if (post.title.includes(req.query.term) || post.contents.includes(req.query.term)) return post;
      return null;
    });
    if (matchingPosts.length === 0) {
      // no matching posts were found
      res.status(STATUS_NO_CONTENT);
      res.json({ searchResults: `No posts found containing ${req.query.term}` });
      return;
    }
    // matching posts were found
    res.status(STATUS_SUCCESS);
    res.json({ searchResults: matchingPosts });
    return;
  }
  // no search term, return all
  res.status(STATUS_SUCCESS);
  res.json(posts);
});

// DELETE operation
server.delete('/posts', (req, res) => {
  // verify that an ID to delete was provided
  if (!req.body.id) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must provide an ID number to delete' });
    return;
  }
  // id to delete was provided, delete the post
  const deleteSuccess = posts.find((post, index) => {
    if (post.id === Number(req.body.id)) {
      posts.splice(index, 1);
      return true;
    }
    return false;
  });
  if (deleteSuccess) {
    res.status(STATUS_SUCCESS);
    res.json({ success: true });
    return;
  }
  res.status(STATUS_USER_ERROR);
  res.json({ error: `Post with ID ${req.body.id} not found, cannot delete` });
});

// PUT operation
server.put('/posts', (req, res) => {
  if (!req.body.id || !req.body.title || !req.body.contents) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must provide an id, title, and contents' });
  }

  let successIndex = 0;
  const putSuccess = posts.find((post, index) => {
    if (post.id === Number(req.body.id)) {
      posts[index].title = req.body.title;
      posts[index].contents = req.body.contents;
      successIndex = index;
      return true;
    }
    return false;
  });

  if (putSuccess) {
    res.status(STATUS_SUCCESS);
    res.json(posts[successIndex]);
    return;
  }
  res.status(STATUS_USER_ERROR);
  res.json({ error: `Post with ID ${req.body.id} not found, cannot update` });
});

server.listen(3000);

module.exports = { posts, server };

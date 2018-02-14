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

server.delete('/posts', (req, res) => {
  // verify that an ID to delete was provided
  if (!req.body.id) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must provide an ID number to delete' });
    return;
  }
  // id to delete was provided, search for it
  let indexToDelete = null;
  let index = 0;
  const maxPosts = posts.length;
  while (indexToDelete === null && index <= maxPosts) {
    if (posts[index].id === Number(req.body.id)) {
      indexToDelete = index;
    }
    ++index;
  }

  if (index === maxPosts) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: `Post with ID ${req.body.id} does not exist, nothing to delete` })
    return;
  }
  // const indexToDelete = posts.reduce((temp, post, index) => {
    //   return post.id === Number(req.body.id) ? index : null;
    // }, 0);
    // console.log('indexToDelete is: ', indexToDelete);
  posts.splice(indexToDelete, 1);
  res.json({ delete: `deleting at index ${indexToDelete}` });
});

server.listen(3000);

module.exports = { posts, server };

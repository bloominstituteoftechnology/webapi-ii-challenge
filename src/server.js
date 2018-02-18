const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;

// later on, look at diffs between this and
// the previous coded solution.
// some salient points are commented on below.

// Remember that the CRUD is:
// CREATE ->post
// READ ->get
// UPDATE ->put
// DELETE
// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];

// a monotonically increasing next ID to assign to the next post
let postId = 0;

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());
const handleUserError = (msg, res) => {
  res.status(STATUS_USER_ERROR).json(msg);
  return;
};

server.get('/posts', (req, res) => {
  // const term = req.query;
  const { term } = req.query;
  if (term) {
    // respond with posts matching the given term
    const filteredOnes = posts.filter((post) => {
      return post.title.includes(term) || post.contents.includes(term);
    });
    res.json(filteredOnes);
  } else {
    res.json(posts);
  }
});

server.post('/posts', (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    return handleUserError({ error: 'Must provide a post title and content' }, res);
  }
  const post = { id: postId, title, contents };
  posts.push(post);
  postId++;
  res.json(post);
});

server.put('/posts', (req, res) => {
  const { id, title, contents } = req.body;
  if (!title || !contents || id === undefined) {
    return handleUserError(
      { error: 'Provide title/contents/id in order to update an object' },
      res,
    );
  }
  // const post = {};
  const post = posts.find((newPost) => {
    return newPost.id === id;
  });
  if (!post) {
    return handleUserError({ error: 'No post with that id' }, res);
  }
  post.title = title;
  post.contents = contents;
  res.json(post);
    /* posts.forEach((p) => {
    if (p.id === id) {
      p.title = title;
      p.contents = contents;
      post[title] = title;
      post[contents] = contents;
      post.id = id; */
});

server.delete('/posts', (req, res) => {
  const { id } = req.body;
  if (id === undefined) {
    return handleUserError({ error: 'Provide a valid ID, please' }, res);
  }
  const post = posts.find((newPost) => {
    return newPost.id === id;
  });

  if (!post) {
    return handleUserError({ error: 'No post has that id' }, res);
  }
  const filteredOnes = posts.filter((newPost) => {
    return newPost.id !== id;
  });
  posts = filteredOnes;
  res.json({ success: true });
});

// });

module.exports = { posts, server };

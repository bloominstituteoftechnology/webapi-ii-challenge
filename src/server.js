const bodyParser = require('body-parser');
const express = require('express');

const STATUS_OK = 200;
const STATUS_CREATED = 201;
const STATUS_USER_ERROR = 422;
const NO_TITLE_OR_CONTENTS_ERROR = 'ERROR: Must include "title" and "contents" fields';
const NO_ID_TITLE_OR_CONTENTS_ERROR = 'ERROR: Must include "id", "title", and "contents" fields';

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];
let postId = 1;

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests
server.get('/', (req, res) => {
  res.status(200).send('<h2>Home Page</h2>');
});

// GET
server.get('/posts', (req, res) => {
  const term = req.query.term;
  // console.log(`term: ${term}`);

  if (term) {
    const filtered = posts.filter((post) => {
      return post.title.indexOf(term) !== -1 ||
        post.contents.indexOf(term) !== -1;
    });
    res.json(filtered);
  } else {
    res.json(posts);
  }

  // my solution...
  // if (!term) {
  //   res.status(STATUS_OK).send(posts);
  //   return;
  // }
  // const results = [];
  // for (let i = 0; i < posts.length; i++) {
  //   if (posts[i].title.includes(term) || posts[i].contents.includes(term)) {
  //     results.push(posts[i]);
  //   }
  // }
  // if (!results.length) {
  //   res.status(STATUS_OK).send(posts);
  //   return;
  // }
  // res.status(STATUS_OK).send(results);
  // // console.log(results);
  // return;
});

// POST /posts { id, title, contents }
server.post('/posts', (req, res) => {
  // // my solution...
  // const post = req.body;
  // if (!post.title || !post.contents) {
  //   res.status(STATUS_USER_ERROR).send(NO_TITLE_OR_CONTENTS_ERROR);
  //   return;
  // }
  // post['id'] = postId++;
  // posts.push(post);
  // console.log(post);
  // res.status(STATUS_CREATED).send(post);
  // return;

  const { title, contents } = req.body;
  if (!title) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must provide a post title' });
    return;
  }
  if (!contents) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must provide a post contents' });
    return;
  }

  const post = { id: postId, title, contents };
  postId++;
  posts.push(post);

  // you would save to database here

  res.status(STATUS_CREATED).json(post);
});

// PUT /posts { id, title, contents }
server.put('/posts', (req, res) => {
  const { id, title, contents } = req.body;

  if (!id) {
    res.status(STATUS_USER_ERROR).json({ error: 'Must provide a post id' });
    return;
  }
  if (!title) {
    res.status(STATUS_USER_ERROR).json({ error: 'Must provide a post title' });
    return;
  }
  if (!contents) {
    res.status(STATUS_USER_ERROR).json({ error: 'Must provide post contents' });
    return;
  }

  const post = posts.find(p => p.id === id);
  if (!post) {
    res.status(STATUS_USER_ERROR).json({ error: `Couldn't find a post with id: ${id}` });
  }
  post.title = title;
  post.contents = contents;
  res.json(post);
});

// DELETE /posts { id }
server.delete('/posts', (req, res) => {
  const { id } = req.body;

  if (!id) {
    res.status(STATUS_USER_ERROR).json({ error: 'Must provide a post id' });
    return;
  }

  const post = posts.find(p => p.id === id);
  if (!post) {
    res.status(STATUS_USER_ERROR).json({ error: `Couldn't find a post with id: ${id}` });
    return;
  }

  posts = posts.filter(p => p.id !== id);
  res.json({ success: true });
});
module.exports = { posts, server };

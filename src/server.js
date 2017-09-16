/* NOTES & TESTS **********************************
***************************************************
app.js => SERVER TEST => line: 4 ******************
***************************************************
server.test.js => TESTS => [ 104, 105, 161, 162 ] *
***************************************************
server.js => NOTES => lines: [ 21, 26, 27, 31, 32 ]
************************************************ */
const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;
const STATUS_OK = 200;
const server = express();
const posts = [];
let id = 0;
server.use(bodyParser.json());

// GET /posts
server.get('/posts', (req, res) => {
  const term = req.query.term;
  if (term) {
    const termPosts = posts.filter(post => post.title.includes(term) || post.contents.includes(term));
    if (termPosts.length > 0) {
      res.json(termPosts); return;
    } res.status(STATUS_USER_ERROR).json({ error: 'Invalid Query' }); return;
  } res.status(STATUS_OK).json(posts); // SEND BACK POSTS ARRAY WITH NO { BRACKETS AROUND IT }
});

// POST /posts
server.post('/posts', (req, res) => {
  const title = req.body.title; // DON'T PUT INTO A POST VARIABLE
  const contents = req.body.contents; // DON'T PUT INTO A POST VARIABLE
  if (!title || !contents) {
    res.status(STATUS_USER_ERROR).json({ error: 'You Must Provide: "title" and "contents"' }); return;
  } id++;
  posts.push({ title, contents, id }); // PUSH THE DESTRUCTURED PROPERTIES INTO THE ARRAY AT THE SAME TIME => AS ONE OBJECT
  res.status(STATUS_OK).json({ title, contents, id }); // SEND BACK REPRESENTATION OF THAT OBJECT
});

// PUT /posts
server.put('/posts', (req, res) => {
  const title = req.body.title;
  const contents = req.body.contents;
  const ID = req.body.id;
  if (!req.body.id || !title || !contents) {
    res.status(STATUS_USER_ERROR).json({ error: 'You Must Provide: "id", "title", and "contents"' }); return;
  } for (let i = 0; i < posts.length; i++) {
    if (posts[i].id === ID) {
      posts[i].title = title;
      posts[i].contents = contents;
      res.status(200).json({ title, contents, id: ID }); return;
    }
  } res.status(STATUS_USER_ERROR).json({ error: 'Invaid "id" was given' });
});

// DELETE /posts
server.delete('/posts', (req, res) => {
  const ID = req.body.id;
  if (!ID) {
    res.status(STATUS_USER_ERROR).json({ error: 'You Must Provide: "id"' }); return;
  } for (let i = 0; i < posts.length; i++) {
    if (posts[i].id === ID) {
      posts.splice(i, 1);
      res.status(200).json({ success: true }); return;
    }
  } res.status(STATUS_USER_ERROR).json({ error: 'Invaid "id" was given' });
});

module.exports = { posts, server };

const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;
const STATUS_AWESOME = 200;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
// const posts = [];
const posts = []; // Karthik's hint re: using let posts = [] ???????
let id = 0;

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// READ
server.get('/posts', (req, res) => {
  const term = req.query.term;
  // if no term, just send the posts array
  if (!term) {
    res.json(posts);
  } else if (term) {
    const filtered = posts.filter((post) => {
      return post.title.indexOf(term) !== -1 || post.contents.indexOf(term) !== -1;
    });
    if (filtered.length > 0) {
      res.json(filtered);
      return;
    }
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Please try again.' });
  }
});

// CREATE
server.post('/posts', (req, res) => {
  const title = req.body.title;
  const contents = req.body.contents;
  if (!title) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Please add a TITLE to your post.' });
    return;
  }
  if (!contents) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Please add CONTENTS to your post.' });
    return;
  }

  const newPost = { id, title, contents };
  posts.push(newPost);
  res.json(newPost);
  id++;
});

// UPDATE
server.put('/posts', (req, res) => {
  const title = req.body.title;
  const contents = req.body.contents;
  const putId = req.body.id;
  console.log('HELLO');
  console.log(req.body);

  if (!title) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Please modify the TITLE.' });
    return;
  }
  if (!contents) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Please modify the CONTENTS too.' });
    return;
  }
  if (!putId) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Please use an ID to identify the post.' });
    return;
  }
  console.log('Scooby snacks', posts);
  console.log('HERE I AM!');
  for (let i = 0; i < posts.length; i++) {
    console.log(`input ID: ${putId}`);
    console.log(`post array index id value: ${posts[i].id}`);
    if (putId === posts[i].id) {
      console.log('inside the for loop IF');
      posts[i] = req.body;
      res.status(STATUS_AWESOME);
      res.json(req.body);
      return;
    }
  }
  console.log('after the for loop');
  res.status(STATUS_USER_ERROR);
  res.json({ error: 'That id is not in the array.' });
  return;
});

// TODO: DELETE
server.delete('/posts', (req, res) => {
  const putId = req.body.id;
  if (!putId) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Please use an ID to identify the post you wanna NUKE OUT OF EXISTENCE.' });
    return;
  }

  for (let i = 0; i < posts.length; i++) {
    if (putId === posts[i].id) {
      // DELETE IT
      posts.splice(i, 1);
      res.status(200).json({ success: true }); return;
    }
  }
  res.status(STATUS_USER_ERROR);
  res.json({ error: "YOU F'ED UP BUDDY}" });
  return;
});

module.exports = { posts, server };

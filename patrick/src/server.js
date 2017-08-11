const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;

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
  id = req.body.id; // not sure if this is right
  const putPost = { id, title, contents };

  if (!title) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Please modify the TITLE too.' });
    return;
  }
  if (!contents) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Please modify the CONTENTS too.' });
    return;
  }
  let postsIndex;
  if (!id) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Please use an ID to identify the post.' });
    return;
  } else if (id) {
    let badID = true;

    for (let i = 0; i < posts; i++) {
      if (id === posts[i].id) {
        badID = false;
        postsIndex = 1;
        return postsIndex;
      }
      if (badID === true) {
        res.status(STATUS_USER_ERROR);
      }
    }
  }
  posts[postsIndex] = putPost;
  res.json(putPost);
});

// TODO: DELETE
server.delete('/posts', (req, res) => {
  res.send(posts);
});

module.exports = { posts, server };

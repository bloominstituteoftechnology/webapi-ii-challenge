const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;
// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];
const server = express();
let id = 0;
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

server.post('/posts', (req, res) => {
  const title = req.body.title;
  const contents = req.body.contents;
  if (!title) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must give title' });
    return;
  }
  if (!contents) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must give contents' });
    return;
  }
  const newpost = {
    title,
    contents,
    id,
  };
  posts.push(newpost);
  id++;
  // check that it has title and content
  // check for id ((???)) let id = 0 id++
  res.json(newpost);
});

server.get('/posts', (req, res) => {
  // if(!title){
  //   res.status(STATUS_USER_ERROR);
  //   res.json({ error: 'Must give title' });
  //   return;
  // }
  // if(!contents) {
  //   res.status(STATUS_USER_ERROR);
  //   res.json({ error: 'Must give contents' });
  //   return;
  // }

  // for the filter:
  // search the array, search title + contents for the filter word
  // if it has the word, then you would posts.push to empty array
  // return that array
  const term = req.query.term;
  if (!term) res.json(posts);
  let newposts = [];
  newposts = posts.filter((post) => {
    return (post.title.includes(term) || post.contents.includes(term));
  });
  res.json(newposts);
});

server.put('/posts', (req, res) => {
  const title = req.body.title;
  const contents = req.body.contents;
  const localid = req.body.id;
  if (!title) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must give title' });
    return;
  }
  if (!contents) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must give contents' });
    return;
  }
  if (!localid) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must give valid id' });
    return;
  }
  if (typeof localid !== 'number') {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must give valid id' });
    return;
  }
  // if (localid >= posts.length) {
  //   res.status(STATUS_USER_ERROR);
  //   res.json({ error: 'Must give valid id' });
  //   return;
  // }
  for (let i = 0; i < posts.length; i++) {
    if (posts[i].id === req.body.id) {
      posts[i] = req.body;
      const newpost = posts[i];
      res.json(newpost);
      return;
    }
  }
  res.status(STATUS_USER_ERROR);
  res.json({ error: 'Must give valid id' });
  return;
});

server.delete('/posts', (req, res) => {
  const localid = req.body.id;
  if (!localid || typeof localid !== 'number') {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must give valid id' });
    return;
  }
  for (let i = 0; i < posts.length; i++) {
    if (localid === posts[i].id) {
      posts.splice(i, 1);
      res.json({ success: true });
      return;
    }
  }
  res.status(STATUS_USER_ERROR);
  res.json({ error: 'Must give valid id' });
  return;
// posts.splice(localid, 1);
// currently not accounting for deleting something in the same spot twice
// (an array with 5 things delete thing on index 2 twice will get rid of index 3 on the second delete)
// will fix
});


// TODO: your code to handle requests
module.exports = { posts, server };

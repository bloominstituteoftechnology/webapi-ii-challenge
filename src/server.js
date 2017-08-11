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
  posts.push({
    title,
    contents,
    id,
  });
  id++;
  // check that it has title and content
  // check for id ((???)) let id = 0 id++
  res.json(posts[id - 1]);
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
  const q = req.query.q;
  if (!q) res.json(posts);
  let newposts = [];
  newposts = posts.filter((post) => {
    return (post.title.includes(q) || post.contents.includes(q));
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
  if (!localid || typeof localid !== 'number' || localid >= posts.length) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must give valid id' });
    return;
  }
  for (let i = 0; i < posts.length; i++) {
    if (posts[i].id === req.body.id) {
      posts[i].title = req.body.title;
      posts[i].contents = req.body.contents;
    }
  }
  res.json(posts[localid]);
});

server.delete('/posts', (req, res) => {
  const localid = req.body.id;
  if (!localid || typeof localid !== 'number' || localid >= posts.length) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must give valid id' });
    return;
  }
  posts.splice(localid, 1);
  res.json({ success: true });
});


// TODO: your code to handle requests
module.exports = { posts, server };

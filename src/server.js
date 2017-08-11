const bodyParser = require('body-parser');
const express = require('express');

const server = express();
const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];
let giveId = 0;

// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

const queryString = (term, searchStr) => {
  const sStr = searchStr;
  const searchArr = sStr.split(' ');
  const sTerm = term;
  for (let i = 0; i < searchArr.length; i++) {
    if (searchArr[i] === sTerm) { return true; }
  }
};
// TODO: your code to handle requests


server.get('/posts', (req, res) => {
  // this is what a query looks like localhost:3000/posts?term='dog'
  // this is how to access this query req.query.term
  // this is a what a parameter looks like /movies/:id
  // to pass to the parameter would be /movies/2
  // to access the params would be req.params.id
  const term = req.query.term;
  if (term) {
    const filterArr = posts.filter((post) => {
      return queryString(term, post.title) || queryString(term, post.contents);
    });
    if (filterArr.length === 0) {
      res.status(404);
      res.json({ error: 'No term present' });
    }
    res.json(filterArr);
  } else {
    res.json(posts);
  }
});
server.post('/posts', (req, res) => {
  const title = req.body.title;
  if (!title) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Please add a title' });
    return;
  }
  const contents = req.body.contents;
  if (!contents) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Please add contents' });
    return;
  }
  posts.push({ id: giveId, title, contents });
  // requires the title and contents and returns error if they arent available
  // create a new object assign unique id
  // returns as a json response
  res.json(posts);
  giveId++;
});

server.put('/posts', (req, res) => {
  // ensures id, title, and contents sends error object if error
  const id = req.body.id;
  if (!id) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Please add a title' });
    return;
  }
  const title = req.body.title;
  if (!title) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Please add a title' });
    return;
  }
  const contents = req.body.title;
  if (!contents) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Please add contents' });
    return;
  }
  for (let i = 0; i <= posts.length; i++) {
    if (posts[i].id === id) {
      posts[i].title = title;
      posts[i].contents = contents;
    }
  }
  res.json(posts);
  // if the id doesn't correspond give error

  // respond with the updated post object in json
});
server.delete('/posts', (req, res) => {
  const id = req.body.id;
  console.log(id);
  if (!id) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Please provide id' });
    return;
  }
  const idex = posts.findIndex((post) => {
    return post.id == id;
  });
  if (idex < 0) {
    console.log(idex);
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'input valid id' });
    return;
  }
  posts.splice(idex, 1);
  res.json(posts);
  // make sure an id is provided to delete and that corresponds to a comment
  // throw error if it doesn't

  // remove the post withh the given 'id' from the array of posts
});


module.exports = { posts, server };

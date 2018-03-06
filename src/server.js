const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [{
  title: 'ma',
  content: 'Habiassdada'
}];
let id = 1;

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests

server.get('/posts', (req, res) => {
  const term = req.query.term;
  if (term) {
    const filter = posts.filter((post) => {
      return post.title === term || post.contents === term;
    });
    res.json(filter);
  } else {
    res.json(posts);
  }
});

server.post('/posts', (req, res) => {
  const { title, contents } = req.body;
  if (!title) {
    res.status(STATUS_USER_ERROR);
    res.json('err: you must provide a title!');
  }
  if (!contents) {
    res.status(STATUS_USER_ERROR);
    res.json('err: you must provide a contents!')
  }
   const newPost = {newId: id++, title, contents};
  
   res.json(newPost);

});


module.exports = { posts, server };

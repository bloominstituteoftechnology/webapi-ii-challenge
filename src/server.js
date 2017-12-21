const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests

server.get('/posts', function(req,res) {
  const { term } = req.query.term;
  for (const post in posts) {
    if (post.title.contains(term) || post.contents.contains(term)) {
      res.send ({ post })
    }
  }
});
server.post('/posts', function(req,res) {
  const { title } = req.body;
  const { contents } = req.body;
  if (!title || !contents) {
  res.send ({ error: "errormessage" });
  }
  else {
    res.send('Posted!');
    posts.push({
      id: (posts.length + 1),
      title: title,
      contents: contents
    });
  }
  console.log(posts);
});
server.put('/posts', function(req,res) {
  const { id } = req.body;
  const { title } = req.body;
  const { contents } = req.body;
  if (!title || !contents || !id) {
  res.send ({ error: "errormessage because no id match" });
  }
  else {
    let containsId = false;
    for (let post in posts) {
      if (post.id === id) {
        post.title = title;
        post.contents = contents;
        containsId = true;
      }
    }
    if (containsId === false) {
      res.send ({ error: 'errorMessage never contained id'});
    }
  }
  console.log(posts);
});

module.exports = { posts, server };

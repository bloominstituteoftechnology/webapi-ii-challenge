const bodyParser = require('body-parser');
const express = require('express');

const STATUS_OK = 200;
const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [
  { title: 'The post title', contents: 'The post contents' },
  { title: 'title', contents: 'hi there' },
  { title: 'title', contents: 'hello' },
  { title: 'title', contents: 'hey there' },
  { title: 'hey', contents: 'wowzie!' }
];

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests
server.get('/', function (req, res) {
  res.status(200).send('<h2>Home Page</h2>');
});

// GET
server.get('/posts', function (req, res) {
  const term = req.query.term;
  console.log(`term: ${term}`);

  if (!term) {
    res.status(STATUS_OK).send(posts);
    return;
  }

  const results = [];
  for (let i = 0; i < posts.length; i++) {
    if (posts[i].title.includes(term) || posts[i].contents.includes(term)) {
      results.push(posts[i]);
    }
  }

  if (!results.length) {
    res.status(STATUS_OK).send(posts);
    return;
  }

  res.status(STATUS_OK).send(results);
  // console.log(results);
  return;
});

module.exports = { posts, server };

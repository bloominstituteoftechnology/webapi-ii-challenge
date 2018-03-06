const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [
  {
    title: 'Title 1',
    contents: 'dogs run'
  },
  {
    title: 'Title 2',
    contents: 'cats meow',
  }
];

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

server.get('/posts', (req, res) => {
  const term = req.query.term;
  let searchResults = [
    {
      title: 'Title 3',
      contents: 'fish fly',
    }
  ];
  if (term) {
    for (let i = 0; i < posts.length; i++) {
      const postValue = Object.values(posts[i]);
      postValue.forEach(value => {
        if (value.indexOf(term !== -1)) {
          searchResults.push(posts[i]);
        }
      });
    }
    res.send(searchResults);
  } else {
    res.send(posts);
  }
});

// TODO: your code to handle requests

module.exports = { posts, server };

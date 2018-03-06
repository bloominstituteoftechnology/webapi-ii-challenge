const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [
  { 
    title: "Title",
    content: "Content",
    id: 1
  }
];

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests

// - If the client provides the query-string parameter `term`, filter the posts to
//   those that have the `term` in their `title` or `contents` (or both), and
//   send down those posts in a JSON response.

// - Otherwise, send down the full array of posts as a JSON response.

server.get('/posts', (req, res) => {
  const term = req.query.term;

  if (term) {
    const searchResults = posts.filter(post => {
      return post.title.indexOf(term) !== -1 || post.contents.indexOf(term) !== -1;
    });
    res.json(searchResults);
  } else {
    res.json(posts);
  }
});


module.exports = { posts, server };

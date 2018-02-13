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
server.get('/posts', (req, res) => {
  const { term } = req.query;
  console.log('term', term);
  if (term) {
    const termPosts = posts.filter((post) => {
      const postTitle = post.title.split(' ');
      const postContent = post.contents.split(' ');
      return (postTitle.includes(term) || postContent.includes(term));
    });
    if (!termPosts.legnth) {
      res.status(STATUS_USER_ERROR);
      res.send({ error: `No posts were found using the term (${term})` });
    } else {
      res.send({ posts: termPosts });
    }
  } else {
    res.send({ posts });
  }
});

module.exports = { posts, server };

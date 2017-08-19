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

// GET method to handle requests to root.
server.get('/', (req, res) => {
  const here = '<a href="/posts"> here.</a>';
  res.send("To use this API go to  <a href='/posts'>/posts</a>.");
});

// GET method to display or search the posts.
server.get('/posts', (req, res) => { // Display the posts.
  if (posts.length === 0) {
    res.status(STATUS_USER_ERROR);
    res.json({error: "There are no posts in memory."});
    return;
  }

  if (!req.query.term) { // If we're not trying to search, display all as per spec.
    res.json(posts);
    return;
  }

  // Else if we are trying to search, so do.
  const results = [];
  posts.forEach((post) => {
    // If our search term is in the title or the contents of current post, regardless of case.
    if (post.title.toLowerCase().indexOf(req.query.term.toLowerCase()) !== -1 || post.contents.toLowerCase().indexOf(req.query.term.toLowerCase()) !== -1) {
      results.push(post); // Add it to results.
    }
  });

  if (results.length > 0)  { // If the search found a post.
    res.json(results);
  } else {
    res.status(STATUS_USER_ERROR);
    res.json({error: "Search term came up with no results."});
  }
});

// POST method to make a new post.
server.post('/posts', (req, res) => {
  if (!req.body.title || !req.body.contents) { // If any parameters are misisng, notify user.
    let response = "You need to also send ";
    if (!req.body.title && !req.body.contents) {
      response += "both the title and the contents ";
    } else {
      !req.body.title ? response += "the title " : ' ';
      !req.body.contents ? response += "the contents " : ' ';
    }
    response += "to build a post.";
    res.status(STATUS_USER_ERROR);
    res.json({error: response});
    return;
  }

  const id = Math.random().toString().substr(2, 5); // Check for collision somehow.
  const newPost = {id, title: req.body.title, contents: req.body.contents};
  posts.push(newPost);
  res.json(newPost);
});

// PUT method to update a post by id.
server.put('/posts', (req, res) => {
  if (posts.length === 0) {
    res.status(STATUS_USER_ERROR);
    res.json({error: "There are no posts in memory."});
    return;
  }

  // TODO What if they only want to update title/contents?
  if (!req.body.title || !req.body.contents || !req.body.id) { // If any parameters are misisng, notify user.
    let response = "You need to send ";
    if (!req.body.title && !req.body.contents) {
      response += "the id and new title/contents ";
    } else {
      !req.body.id ? response += "the id of the post " : '';
      !req.body.title ? response += "the new title " : ' ';
      !req.body.contents ? response += "the new contents " : ' ';
    }
    response += "to update a post.";
    res.status(STATUS_USER_ERROR);
    res.json({error: response});
    return;
  }

  posts.forEach((post, i) => { // Search through the posts for our id.
    if (post.id === req.body.id) {
      post.title = req.body.title;
      post.contents = req.body.contents;
      res.json(post);
      return;
    }
  });

  res.json({error: "That id wasn't found."});
});

server.delete('/posts', (req, res) => {
  if (posts.length === 0) {
    res.status(STATUS_USER_ERROR);
    res.json({error: "There are no posts in memory."});
    return;
  }

  if (!req.body.id) {
    res.status(STATUS_USER_ERROR);
    res.json({error: "You need to send the post id."});
    return;
  }

  posts.forEach((post, i) => {
    if (post.id === req.body.id) {
      posts.splice(i, 1);
      res.json({success: true});
      return;
    }
  });
  res.status(STATUS_USER_ERROR);
  res.json({error: "id didn't match any posts in memory."});
});

module.exports = { posts, server };

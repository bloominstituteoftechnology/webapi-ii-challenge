const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;
const STATUS_OK = 200;
/* eslint-disable prefer-const, no-var, no-else-return */
// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
var posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests

module.exports = { posts, server };


/* eslint-disable no-console */
const PATH = '/posts';
let id = 5;
server.get('/posts', (req, res) => {
  console.log('**************get /posts**************');
  let returnedPosts = posts;
  if (req.query.term === 'title') {
    console.log('posts:', posts);
    returnedPosts = posts.filter((post) => {
      return post.title.indexOf(req.query.term) >= 0;
    });
    console.log('returned titles:', returnedPosts);
  } else if (req.query.term) {
    returnedPosts = returnedPosts.filter((post) => {
      return post.contents.indexOf(req.query.term) >= 0;
    });
  }
  res.json(returnedPosts);
});
server.post(PATH, (req, res) => {
  const {
    title,
    contents
  } = req.body;
  if (!title || !contents) {
    res.status(STATUS_USER_ERROR).json({ error: 'missing data' });
  } else {
    id++;
    const withId = {
      id,
      title,
      contents
    };
    posts.push(withId);
    res.json(withId);
  }
});

server.put(PATH, (req, res) => {
  const {
    title,
    contents
  } = req.body;
  const passedId = req.body.id;
  console.log(`**************put /posts************** passedId: ${passedId} title:${title}  contents: ${contents}`);
  if (!title || !contents || !passedId || passedId < 5) {
    console.log('put return STATUS_USER_ERROR 422');
    res.status(STATUS_USER_ERROR).json({ error: 'missing data' });
  } else {
    const matchPost = posts.filter((post) => { return post.id === passedId; })[0];
    if (!matchPost) {
      console.log('put return STATUS_USER_ERROR 422 no matchPost');
      res.status(STATUS_USER_ERROR);
      return;
    }
    matchPost.title = title;
    matchPost.contents = contents;
    console.log(`**************put /posts matchPost**************  id: ${matchPost.id} title:${matchPost.title}
                contents: ${matchPost.contents}`);
    res.json(matchPost);
  }
});

server.delete(PATH, (req, res) => {
  if (!req.body.id) {
    res.status(STATUS_USER_ERROR).json({ error: 'no body id' });
  } else {
    const newPosts = posts.filter((post) => { return post.id !== req.body.id; });
    if (newPosts.length + 1 === posts.length) {
      console.log('<<<<<delete success<<<<');
      posts = newPosts;
      // res.body = { success: true };
      res.json({ success: true });
    } else {
      console.log('newPosts.length:', newPosts.length, '  posts.length', posts.length);
      res.status(STATUS_USER_ERROR);
      console.log('after res.status');
      res.json({ success: false, error: true });
      console.log('after res.json');
    }
  }
});

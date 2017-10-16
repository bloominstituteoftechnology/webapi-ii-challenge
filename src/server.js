const bodyParser = require('body-parser');
const express = require('express');

const STATUS_OK = 200;
const STATUS_NOT_FOUND = 404;
const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;

/*
not using these right now
const PATH = '/posts';
const METHOD_GET = 'GET';
const METHOD_POST = 'POST';
const METHOD_PUT = 'PUT';
const METHOD_DELETE = 'DELETE';
*/

// helper functions for error messages
const handleUserError = (msg, res) => {
  res.status(STATUS_USER_ERROR).json(msg);
  return;
};

const handleStatusNotFoundError = (msg, res) => {
  res.status(STATUS_NOT_FOUND).json(msg);
  return;
};

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];
let postID = 0;
const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests
server.get('/posts', (req, res) => {
  if (req.query.term) {
    const postTerm = posts.filter((post, i) => {
      if (
        post.title.includes(req.query.term) ||
        post.contents.includes(req.query.term)
      ) {
        return true; // puts into array
      }
      return false;
    });
    res.json(postTerm);
  }
  res.json(posts);
});

server.post('/posts', (req, res) => {
  const { title, contents } = req.body;
  console.log(req.body);
  if (!title || !contents) {
    return handleUserError(
      { error: 'Please provide both title and contents' },
      res
    );
  }
  const post = { id: postID, title, contents };
  posts.push(post);
  postID++;
  res.json(post);
});

server.put('/posts', (req, res) => {
  const { id, title, contents } = req.body;
  console.log(req.body); // look at this if it doesn't pass (id might need to be postID)
  if (!id || !title || !contents) {
    return handleUserError(
      { error: 'Please provide a title and contents and id' },
      res
    );
  }
  if (id !== postID) {
    return handleUserError({ error: 'This ID is incorrect' }, res);
  }
  const post = { id, title, contents };
  posts.push(post);
  res.json(post);
});

//  Ryan's code
/*
server.put('/posts', (req, res) => {
  const { id, title, contents } = req.body;
  if (!title || !contents || !id) {
    return handleUserError(
      { error: 'You need contents/id/title in order to update an object' },
      res,
    );
  }
  const post = {};
  posts.forEach((p) => {
    if (p.id === id) {
      p.title = title;
      p.contents = contents;
      post[title] = title;
      post[contents] = contents;
      post[id] = id;
    }
  });
  if (Object.keys(post).length === 0) {
    return handleUserError({ error: 'No post found by that id!' }, res);
  }
  res.json(post);
});
*/
server.delete('/posts', (req, res) => {
  const { id } = req.body;
  /* if (!id || id !== postID) {
    return handleUserError({ error: 'Please provide correct ID' }, res);
  } */

  if (!id) {
    return handleUserError({ error: 'Please provide correct ID' }, res);
  }

  if (id !== postID) {
    return handleUserError({ error: 'Post does not exist' }, res);
  }

  for (let i = 0; i < posts.length; i++) {
    if (posts[i].id === id) {
      posts.splice(i, 1);
      break;
    }
  }
  res.json(posts);
});

module.exports = { posts, server };
// res.status(500).json({ error: 'something is wrong' });
// res.status(500).send({ error: "boo:(" });

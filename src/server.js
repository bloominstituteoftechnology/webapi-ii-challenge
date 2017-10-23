const bodyParser = require('body-parser');
const express = require('express');
const DataManager = require('./datamanager.js');

const data = new DataManager();

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests

let postId = 0;

const handleUserError = (msg, res) => {
  res.status(STATUS_USER_ERROR).json(msg);
};

/* Main server access point.
 * * * * * * * * * * * * * * * * * * * *
 * Basic statistics for DB
 * list of routes
 */
server.get('/', (req, res) => {
  // console.log(req.query);
  // console.log(req.params);
});

// Get search results from server
server.get('/posts', (req, res) => {
  // remote ip address
  const reqIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  // Query term
  const { term } = req.query;
  // Is there a term search, return all posts
  if (term === undefined) {
    res.json(posts);
  } else {
    // Search by post title
    let sorted = posts.filter((post, i) => {
      return post.title.indexOf(term) >= 0;
    });
    // If nothing came from search of post title
    if (sorted.length === 0) {
      // Search by post body content
      sorted = posts.filter((post, i) => {
        return post.contents.indexOf(term) >= 0;
      });
    }
    // Return search results at this point.
    res.json(sorted);
  }
});

// Create new post
server.post('/posts', (req, res) => {
  // remote ip address
  const reqIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  // get title and contents from post
  const { title, contents } = req.body;
  // If there is not a title or contents
  if (!title || !contents) {
    // Return user error
    return handleUserError({ error: 'You need contents AND title silly' }, res);
  }
  // create new post object
  const post = { id: postId, title, contents };
  // Make post datatype
  // const post = new data.storeageType
  // Push post to post array
  posts.push(post);
  // Increment post counter
  postId++;
  // return post on success to user
  res.json(post);
});

server.put('/posts', (req, res) => {
  // console.log(req.body, req.query, req.params);
  const post = posts.find((p, i) => p.id === req.body.id);
  const postIndex = (post !== undefined) ? posts.indexOf(post) : undefined;

  if (post === undefined) {
    handleUserError({ error: 'This is not the post you are looking for; It is missing the id.' }, res);
    return;
  }

  if (req.body.title === undefined) {
    handleUserError({ error: 'Impending Error, Abort! Post is missing title.' }, res);
    return;
  }

  if (req.body.contents === undefined) {
    handleUserError({ error: 'Impending Error, Abort! Post is missing contents.' }, res);
    return;
  }

  posts[postIndex] = Object.assign(post, req.body);
  res.json(posts[postIndex]);
});

server.delete('/posts', (req, res) => {
  const { id } = req.body;
  if (id === undefined) {
    handleUserError({ error: 'Impending Error, Abort! Request to Delete DENIED on account of you no have ID.' }, res);
    return;
  }

  const postIndex = posts.findIndex((p, i) => p.id === req.body.id);

  if (postIndex === -1) {
    handleUserError({ error: 'Impending Error, Abort! Request to Delete DENIED on account of you no know the known ID.' }, res);
    return;
  }

  const removed = posts.splice(postIndex, 1);

  if (removed.length === 1) {
    res.json({ success: true });
  } else {
    res.json(handleUserError({ success: false, error: 'unknown error while deleting.  Please contact the president, it is serious(no not really.)' }, res));
    return;
  }
});

module.exports = { posts, server };

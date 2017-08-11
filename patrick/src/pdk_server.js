const bodyParser = require('body-parser');
const express = require('express');

const fs = require('fs');

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];
let id = 0;

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests

/* DUMMY PAGES ************************************************************* */
// GET req.query
server.get('/hello', (req, res) => {
  // http://localhost:3001/hello?name=Latoyya
  const name = req.query.name;
  if (!name) {
    // res.send('<h1>Hello, world!</h1>');
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Please provide a name!' });
    return;
  }
  res.send(`<h1>Hello, ${name}!</h1>`);
});
// GET req.params
server.get('/word/:word', (req, res) => {
  // http://localhost:3001/word/pizza
  const word = req.params.word;
  // if (!word) {
  //   res.status(STATUS_USER_ERROR); // <-- No WORD, JUST throws a 404
  //   res.json({ error: 'Please provide a word!' });
  //   return;
  // }
  res.send(`<h1>The MOST AWESOMEST WORD ever is, "${word}"!</h1>`);
});
// using an index.html file (no CSS!)
server.get('/', (req, res) => {
  fs.readFile('index.html', 'utf8', (err, contents) => {
    if (err) {
      throw err;
    }
    res.send(contents);
  });
});

/* READ READ READ READ READ READ READ READ READ READ READ READ READ READ READ */
// req = request
// res = response
// when the server receives
// i.e. when the client sends
// an HTTP GET request
// to GET a resource at the /posts location
// invoke the request, response CallBack
server.get('/posts', (req, res) => {
  // e.g. http://localhost:3000/posts?term
  // query enters term as a param key
  // e.g. http://localhost:3000/posts?termKEY=termVALUE
  // after = enters term as a param value
  const term = req.query.term;
  // console.log(term); // requires ?termKEY=termVALUE to log to nodemon server output

  // if there's a term, do some stuff otherwise show all
  if (!term) {
    // default to display entire posts array
    // res.send('HTTP GET: "Hello!"');
    // console.log('server.get('/posts', ... ) YAY')
    res.json(posts);
  } else if (term) {
    const filtered = posts.filter((post) => {
      return post.title.indexOf(term) !== -1 || post.contents.indexOf(term) !== -1;
    });
    if (filtered.length > 0) {
      res.json(filtered);
      return;
    }
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Please try again.' });
  }
});

/* CREATE CREATE CREATE CREATE CREATE CREATE CREATE CREATE CREATE CREATE CREATE */
// when server receives (i.e. when client sends)
// an HTTP POST request
// to POST a resource at the /posts location
// invoke (req, res) CallBack
server.post('/posts', (req, res) => {
  /* add a post to
  posts = [
    {
      title: "The post title",
      contents: "The post contents"
    }
  ]
  */
  const title = req.body.title;
  const contents = req.body.contents;

  // error checks
  if (!title) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Please add a TITLE to your post.' });
    return;
  }
  if (!contents) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Please add CONTENTS to your post.' });
    return;
  }

  // differentiate var name of POST action from what is posted...
  // singular
  const aPost = { id, title, contents };
  posts.push(aPost);

  // console.log('server.post('/posts',, ... ) YAY');
  // res.send('HTTP POST something?');
  // res.json({ posts });
  res.json(posts);
  id++;
});

/* UPDATE UPDATE UPDATE UPDATE UPDATE UPDATE UPDATE UPDATE UPDATE UPDATE UPDATE */
server.put('/posts', (req, res) => {
  // console.log('server.put('/posts',, ... ) YAY');
  res.send('HTTP PUT something?');
});

/* DESTROY DESTROY DESTROY DESTROY DESTROY DESTROY DESTROY DESTROY DESTROY */
server.delete('/posts', (req, res) => {
  // console.log('server.delete('/posts',, ... ) YAY');
  res.send('HTTP DELETE something?');
});

module.exports = { posts, server };

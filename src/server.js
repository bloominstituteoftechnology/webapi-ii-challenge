/* eslint-disable */
const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests
server.get('/posts', (req, res) => {
  const search = req.query.term;
  if (search) {
    const filtered = posts.filter(obj =>
      (obj.title.split(' ').includes(search) || obj.contents.split(' ').includes(search))
    );
    res.status(200).json(filtered);
  } else {
    res.status(200).json(posts);
  }
});
server.post('/posts', (req, res) => {
  if (!req.body.title || !req.body.contents || !req.body.id) {
    res.status(422).json({ error: 'Provide id,contents and title' });
  } else {
    const post = req.body;
    posts.push(post);
    res.status(200).json(posts);
  }
});

server.put('/posts', (req, res) => {
    if (!req.body.title || !req.body.contents || !req.body.id) {
      res.status(422).json({ error: 'Provide id,contents and title' });
    } else {
        let flag = 0;
      posts.map(post => {
          if(post.id === req.body.id ) {
              flag = 1;
              post.title = req.body.title;
              post.contents = req.body.contents;
          }
      })
      if (flag) {
        res.status(200).json(posts);
      } else {
        res.status(422).json({ error: 'Provide a valid id' });
      }
    }
  });
  server.delete('/posts', (req, res) => {
    if (!req.body.id) {
      res.status(422).json({ error: 'No Id Provided' });
    } else {
        let filtered = posts.filter(post =>
            post.id !== req.body.id
        )
        if (filtered.length < posts.length) {
            posts = filtered;
            res.status(200).json({ success: true });
        } else {
            res.status(422).json({ error: 'Provide a valid id' });
        }
      }
  });

  
module.exports = { posts, server };

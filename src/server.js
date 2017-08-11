const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');

const STATUS_USER_ERROR = 422;

let posts = [
    { id: '1', title: 'node-express1', contents:'read' },
    { id: '2', title: 'node-express2', contents:'create' },
    { id: '3', title: 'node-express3', contents:'update' },
    { id: '4', title: 'node-express4', contents:'delete' }
    ];

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

server.get('/posts', (req, res) => {
    res.send(posts);
    const { title, contents } = req.body;
    const term = {
        title,
        contents
    }
    if (term) {
        const filteredPost = posts.filter((post) => {
          return post.title.indexOf(post) !== -1 || post.contents.indexOf(post) !== -1;
        });
        res.json({ filteredPost });
        return;
    } else {
      res.json({ posts });
    }
});

server.post('/posts', (req, res) => {
    const { id, title, contents } = req.body;
    if (!title || !contents) {
      res.status(STATUS_USER_ERROR);
      res.json({ error: `title or contents missing`});
      return;
    }
    const newPost = {
      id,
      title,
      contents
    };
    posts.push(newPost);
    res.json({ posts });
});

server.put('/posts', (req, res) => {

    const postsId = req.param.id;
    const { title, contents } = req.body;

    if (!title || !contents || !postsId) {
      res.status(STATUS_USER_ERROR);
      res.json({ error: `title or contents or id missing`});
      return;
    }
    posts.forEach((post, i) => {
    if (post.id === postsId) {
      res.status(200).json({ title, contents,  postsId });
      return;
    }
    });
    res.status(422).json({ Error: 'invalid id ' });
    posts[id] = true;
    res.json({ posts });
});

server.delete('/posts', (req, res) => {
    const { id, title, contents } = req.body;
    const posts1 = req.params.id;
    const posts2 = req.params.id;
    if (!id) {
      res.status(STATUS_USER_ERROR);
      res.json({ error: `id missing `});
      return;
    }
    posts.slice(posts1);
    res.json({ posts });
});
module.exports = { posts, server };

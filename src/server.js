const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [ {
                'id': 0,
                'title': 'Post0',
                'content': 'Content0'
              },{
                'id': 1,
                'title': 'Post1',
                'content': 'Content1'
              },
              {
                'id': 2,
                'title': 'Post2',
                'content': 'Content2'
              }];
let nextID = 1;

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests
server.get('/posts', (req, res, next) => {
    res.status(200).json(posts);
});

server.post('/posts', (req, res, next) => {
   const { term } = req.query;
   if (term) {
       const termPosts = posts.filter((post) => {
            return post.title.indexOf(term) !== -1 ||
                   post.content.indexOf(term) !== -1;
        });
        res.json(termPosts);
   } else {
       res.status(200).json(posts);
   }
});

server.post('/posts', (req, res) => {
    const { title, contents } = req.body;
    if (!title) {
        res.status(STATUS_USER_ERROR).json( {error: 'Must provide a post title.'} );
        return;
    }

    if (!contents) {
        res.status(STATUS_USER_ERROR).json( {error: 'Must provide a post content.'} );
        return;
    }
});

module.exports = { posts, server };

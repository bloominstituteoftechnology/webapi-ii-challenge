/* eslint-disable */
const bodyParser = require('body-parser');
const express = require('express');
const server = express();
const morgan = require('morgan');
const path = require('path');
const STATUS_USER_ERROR = 422;
server.use(bodyParser.json());

const sendUserError = (msg, res) => {
    res.status(422);
    res.json({ Error: msg });
    return;
  };
const port = 3000;
let posts = [];

server.get('/posts', (req, res) => {
    res.json(posts);
});

let postID = 1;

server.post('/posts', (req, res) => {
    const { name, contents } = req.body;
    const newPost = {name, contents, id: postID };
    if (!name || !contents ) {
        return sendUserError( "You need to include Name/Contents to create a post in the DB.",
        res
    );
    }
    const findPostByName = post => {
        return post.name === name;
    };
    if (posts.find(findPostByName)) {
        return sendUserError(
            `${name} already exists in the database`,
            res
        );
    }

    posts.push(newPost);
    postID++;
    res.json(posts);
});

server.put('/posts', (req, res) => {
    const {name, contents, id} = req.body;
    const findPostById = post => {
        return post.id === id;
    };
    const foundPost = posts.find(findPostById)
        if (!foundPost) {
            return sendUserError('No post found by that ID', res);
        } else {
            if (name) foundPost.name = name;
            if (contents) foundPost.age = age;
            res.json(foundPost);
        }
});

server.delete('/posts', (req, res) => {
    const { id } = req.body;
    console.log(id);
    let findPost;
    const findPostById = post => {
      findPost = post;
      return post.id === id;
    };
    if (posts.find(findPostById)) {
      posts.forEach((post, i) => {
        if (post.id === id) {
          post.splice(i, 1);
          return res.status(200).json(posts);
        }
      });
    } else {
      return sendUserError('No posts by that ID exists in the DB', res);
    }
  });

  server.listen(port, err => {
    if (err) console.log(err);
    console.log(`server is listening on port ${port}`);
  });


module.exports = { posts, server };

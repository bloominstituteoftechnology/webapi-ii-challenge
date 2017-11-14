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
    console.log(posts);
});

let postID = 1;

server.post('/posts', (req, res) => {
    console.log("Post", req.body);
    const { title, contents } = req.body;
    if (!title || !contents) {
        res.status(STATUS_USER_ERROR);
        res.json({error: "You need to include more information"});
        return;
    }
    const post = { id: postID, title, contents };
    console.log(post);
    posts.push(post);
    postID++;
    res.json(post);
});

server.put('/posts', (req, res) => {
    const {title, contents, id} = req.body;
    console.log(req.body.id);
    const findPostById = posts => {
        if (!posts.id === id ) {
            res.status(STATUS_USER_ERROR);
            res.json({error: "You need to include more information"});
            return;
        }
        return posts.id === id;
    };
    const foundPost = posts.find(findPostById)
        if (!foundPost) {
            res.status(STATUS_USER_ERROR);
            res.json({error: "You need to include more information"});
            return;
        } else {
            if (title) foundPost.title = title;
            if (contents) foundPost.age = age;
            res.json(foundPost);
        }
});

server.delete('/posts', (req, res) => {
    const { id } = req.body;
    console.log(id);
    let findPost;
    const findPostById = posts => {
      findPost = posts;
      return posts.id === id;
    };
    if (posts.find(findPostById)) {
      posts.forEach((posts, i) => {
        if (posts.id === id) {
          posts.splice(i, 1);
          return res.status(200).send(posts);
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

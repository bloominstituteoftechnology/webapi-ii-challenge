const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

const PostsController = require('./PostsController');

server.get('/posts', PostsController.getPosts);

server.post('/posts', PostsController.createPost);

server.put('/posts', PostsController.updatePost);

server.delete('/posts', PostsController.deletePost);

module.exports = { posts: PostsController.posts.getPosts(), server };

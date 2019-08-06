// api to manage channels
const express = require('express');

// require posts router file
const userPosts = require('../api/users/blog_posts/blog_posts_router');

// use express
const server = express();

// use json
server.use(express.json());

// base url
server.use('/api/posts', userPosts);

// export
module.exports = server
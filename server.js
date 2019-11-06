const express = require('express');
const dataRouter = require('./data/postsrouter.js');

const server = express();

server.use(express.json());
server.use('/api/posts', dataRouter);

server.get("/", (req, res) => {
   res.send(` 
   
   <h1>Blog Posts</h1>
   <p>Welcome to the blog</p>
   
   `);
});


module.exports = server; 
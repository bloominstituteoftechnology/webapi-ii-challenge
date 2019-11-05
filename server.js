const express = require('express');
const dataRouter = require('./serverRoutes.js');

const server = express();

server.use(express.json());
server.use('/api/data', dataRouter);

server.get("/", (req, res) => {
   res.send(` 
   
   <h1>Blog Posts</h1>
   <p>Welcome to the blog</p>
   
   `);
});


module.exports = server; 
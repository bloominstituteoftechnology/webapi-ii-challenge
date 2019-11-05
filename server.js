const express = require('express');
const blogrouter = require('./blogs/blog-router')

const server = express();

server.use(express.json());

server.use('/api/blogs', blogrouter);



// server.get('/', (req, res) => {
//     res.send(`
//       <h2>Lambda Hubs API</h>
//     `);
// });


module.exports = server;

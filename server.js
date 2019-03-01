const express = require('express');
const server = express();
// import 
server.use(express.json());

const postRoutes = require('./posts/postsRoutes');

server.get('/', (req, res) => {
    res.send('Api up and running');
})

server.use('/api/posts/', postRoutes);

module.exports = server;
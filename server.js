const express = require('express');
const db = require('./data/db.js');

const server = express();
const port = 5000;

server.use(express.json());

server.post('/api/posts', (req, res) => {

});

server.get('/api/posts', (res, req) => {

});

server.get('/api/posts/:id', (res, req) => {

});

server.delete('/api/posts/:id', (res, req) => {

});

server.put('/api/posts/:id', (res, req) => {
  
});

server.listen(port, () => console.log(`Server running on port ${port}`));

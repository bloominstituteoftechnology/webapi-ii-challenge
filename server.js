const express = require('express');
const db = require('./data/db.js');

const server = express();
const port = 5000;

server.use(express.json());

server.post('/api/posts', (req, res) => {

});

server.get('/api/posts', (req, res) => {

});

server.get('/api/posts/:id', (req, res) => {

});

server.delete('/api/posts/:id', (req, res) => {

});

server.put('/api/posts/:id', (req, res) => {

});

server.listen(port, () => console.log(`Server running on port ${port}`));

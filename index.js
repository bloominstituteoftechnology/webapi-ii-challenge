// import your node modules
const express = require('express');
const db = require('./data/db.js');

const server = express();
const PORT = 3000;

// add your server code starting here

server.get('/api/posts', (req, res) => {
    //find
})

server.get('/api/posts/:id', (req, res) => {
    //findById
})

server.post('/api/posts', (req, res) => {
    //insert
})

server.put('/api/posts/:id', (req, res) => {
    //update
})

server.delete('/api/posts/:id', (req, res) => {
    //remove
})

server.listen(PORT, () => {
    console.log('Server is listening');
})

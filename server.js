// import your node modules
const express = require('express'); // import express from 'express'

const db = require('./data/db.js');

// add your server code starting here
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('Home Page');
})

server.get('/api/posts', (req, res) => {
    db.find()
    .then( posts => {
        res.status(200).json(posts);
    })
    .catch(err => {
        console.log('error', err);

        res.status(500).json({ error: 'The posts information could not be retrieved.'})
    })
})

server.get('/api/posts/:id', (req, res) => {
    db.find()
    .then( posts => {
        res.status(200).json(posts);
    })
    .catch(err => {
        console.log('error', err);

        res.status(500).json({ error: 'The post information could not be retrieved.'})
    })
})

server.listen(9000, () => console.log('API running on port 9000'))
// import your node modules
// importing express
const express = require('express');
const db      = require('./data/db.js');

// add your server code starting here
const port   = 5001;
const server = express();
server.use(express.json());

// declared get() to root route
server.get('/', (req, res) => {
    res.send ('Hello from express')
});

// POST REQUEST
server.post('/api/posts', (req, res) => {
    // declaring const for body
    const { title, content } = req.body;
        db
        .insert({ title, content})
        .then(response => {
           res.status(201).json(response)
        })
        .catch(error => {
            res.json(error)
        });
});

// GET REQUEST
server.get('/api/posts', (req, res) => {
    db
    .find()
    .then(posts => {
        res.json({ posts });
    })
    .catch(error => {
        res.status(500).json(error)
    })
})


// calling serving to listen to traffic 
server.listen(port, () => console.log(`Server running on port ${port}`));
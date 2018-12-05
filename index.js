// import your node modules

const db = require('./data/db.js');
const express = require('express');
const server = express();
const PORT = 5000;

// add your server code starting here

console.log('foo?')

server.get('/', (req, res) => {
    res.send(
        'hi there from our regular get function! ~_~'
    )
})

// endpoint shenanigans

server.get('/api/posts', (req, res) => {
    db.find()
    .then(posts => {
        res.json(posts)
    })
    .catch(err => {
        res.status(500)
        res.json(`Huh, can't find those posts`)
    })
})

server.get('/api/posts/:id', (req, res) => {
    const {id} = req.params;
    db.findById(id)
    .then(post => {
        if(post) {
            res.json(post);
        } else {
            status(404)
            res.json('Error 404: Idk that post')
        }
    })
    .catch(err => {
        res.status(500)
        res.json('Error 500: Idk that post')
    })
})

// post req

server.post('/api/users/', (req, res) => {
    const user = req.body;
    db.insert()
    .then(user => {
        console.log('user from insert method:', user)
        res.json(user)
    })
    .catch(err => {
        res
        .status(500)
        .json('Error: failed to add user')
    })
})


// server has to be told to listen

server.listen(PORT, () => {
    console.log(`server is alive on port ${PORT}`);
});
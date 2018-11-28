// import your node modules
const express = require('express');
const server = express();
const db = require('./data/db.js');

// add your server code starting here
server.get('/', (req, res) => {
    res.json('HELLO!');
});

server.get('/api/posts', (req, res) => {
    db.find()
    .then((posts) => {
        res.json(posts);
    })
    .catch( err => {
        res
        .status(500)
        .json({message : 'post could not be retrieved'})
    })
}) 

server.get('/api/posts/:id', (req, res) => {
    const {id} = req.params;
    db.findById(id)
    .then( post => {
        if(post){
            res.json(post);
        }
        else {
            res
            .status(404)
            .json({message: 'post does not exist'});
        }
    } )
    .catch( err => {
        res
        .status(500)
        .json({message : 'post could not be retrieved'})
    })
})

server.listen(4000, () => {
    console.log('server is running');
})
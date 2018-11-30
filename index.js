// import your node modules
const express = require('express');
const server = express();
const db = require('./data/db.js');
server.use(express.json());

// add your server code starting here
server.post('/api/posts', (req, res) => {
    const { title, contents} = req.body;
    if(!title || !contents){
        res.status(401).json({errorMessage:'Please provide title and contents for the post.'});
    }
    db.insert({title, contents})
    .then(response => {
        res.status(201).json(response);
    })
    .catch( err => {
        res
        .status(500)
        .json({errorMessage : 'There was an error while saving the post to the database'});
    })
})

server.get('/', (req, res) => {
    res.json('HELLO!');
});

server.get('/api/posts', (req, res) => {
    db.find()
    .then((post) => {
        res.json(post);
    })
    .catch( err => {
        res
        .status(500)
        .json({errorMessage : 'post could not be retrieved'})
    })
}) 

server.get('/api/posts/:id', (req, res) => {
    const {id} = req.params;
    db.findById(id)
    .then( post => {
        if(post[0]){
            res.json(post);
        }
        else {
            res
            .status(404)
            .json({errorMessage: 'post does not exist'});
        }
    } )
    .catch( err => {
        res
        .status(500)
        .json({errorMessage : 'post could not be retrieved'})
    })
})

server.listen(4000, () => {
    console.log('server is running');
})
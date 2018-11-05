// import your node modules
// import axios from 'axios'; ES2015 modules

const express = require('express');

// const greeter = require('./greeter.js');
const db = require('./data/db.js');

const server = express();

server.get('/', (req, res) => {
    res.json('alive');
});

// server.get('/greet', (req, res) => {
//     res.json({ hello: 'stranger' });
// });

server.get('/api/posts', (req, res) => {
    db.find().then(posts => {
        res.json(posts);
    })
    .catch(err => {
        res.status(500).json({ message: "The posts information could not be retrieved." });
    });
});

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;

    db.findById(id).then(post => {
        if(post.id) {
           res.status(200).json(post); 
        } else {
            res.status(404).json({message: "The post with the specified ID does not exist."  });
        }
        
    })
    .catch(err => {
        res
        .status(500)
        .json({message: "The post information could not be retrieved." })
    });
});

// server.get('/greet/:person', greeter);

server.listen(9000, () => console.log('the server is alive!'));

// add your server code starting here

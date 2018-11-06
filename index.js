// import your node modules

const db = require('./data/db.js');

// add your server code starting here

const express = require('express');
const server = express();

server.get('/api/posts', (req, res) => {

    db.find()
    .then(posts => res.json(posts))
    .catch(err => {
        res.status(500)
        .json({message : "The posts information could not be retrieved.", 
                error : err })
    })
    });

    server.get('/api/posts/:id', (req, res) => {
        const {id} = req.params;

        db.findById(id)
        .then(post => res.json(post))
        .catch(err => {
            res.status(500)
            .json({message : "The post information could not be retrieved.", 
                    error : err })
        })
        });


server.listen(9000, console.log("\n Server ALIVE \n"));
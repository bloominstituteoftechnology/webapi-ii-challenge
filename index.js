// import your node modules

const db = require('./data/db.js');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const server = express();

var Port = 5000;

// add your server code starting here
server.use(cors());
server.use(bodyParser.json());
server.get('/api/posts', (req, res) => {
    db.find()
        .then(posts => {
            res
                .status(200)
                .json(posts)
        })
        .catch(error => {
            res
                .status(500)
                .json({ error: "The posts information could not be retrieved." })
        })
})
server.get('/api/posts/:id', (req, res) => {
    // console.log(req.params)
    const thisId = req.params.id;
    // console.log(thisId);
    db.findById(thisId)
        // .then(post => {
        //     res
        //         .status(200)
        //         .json(post)
        // })
        .then(post => {
            if(post) {
                res
                    .status(200)
                    .json(post)
            } 
            else {
                res
                    .status(404)
                    .json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(error => {
            res
                .status(500)
                .json({ error: "The post information could not be retrieved." })  
        })
})

server.post('/api/posts', (req, res) => {
    console.log(req.body, 'req.body check');
    db.insert(req.body)
        .then(post => {
            console.log(post);
            // res
            //     .status(201)
            //     .json(post)
            if(req.body.title !== '') {
                res
                    .status(201)
                    .json(post)
            }
            else {
                res
                    .status(400)
                    .json({ errorMessage: "Please provide title and contents for the post." })
            }
        })
        .catch(error => {
            console.log(error, 'server-error')
            res
                .status(500)
                .json({ error: "There was an error while saving the post to the database" })
        })
})

server.delete('/api/posts/:id', (req, res) => {
    const thisId = req.params.id;
    db.remove(thisId)
        .then(post => {
            console.log(post);
            // res
            //     .status(200)
            //     .json(post)
            if(post){
                res
                    .status(200)
                    .json(post)
            }
            else{
                res
                    .status(404)
                    .json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(error => {
            res
                .status(500)
                .json({ error: "The post could not be removed" })
        })
})
server.put('/api/posts/:id', (req, res) => {
    const thisId = req.params.id;
    const updatedPost = req.body;
    db.update(thisId, updatedPost)
        .then(response => {
            console.log(response, 'update-server-log')
            res
                .status(200)
                .json(response)
        })
        .catch(error => {
            console.log(error, 'update-server-error')
            res
                .status(500)
                .json({ error: "The post information could not be modified." })
        })
})

//ALWAYS AT BOTTOM
server.listen(Port, () => {
    console.log(`Server at Port ${Port} is up and running!`)
})

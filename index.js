// import your node modules

const express = require('express');     //import express package
const db = require('./data/db.js');     

const server = express();               //creates the server; express is a function
const PORT = 5000;

// CORS stuff
const cors = require('cors')

server.use(cors())



// handle requests to the root of the api, the / route

server.get('/api/posts', (req, res) => {
    db.find()
    .then((posts) => {
        res.json(posts);      //implicit status(200)
    })
    .catch(err => {
        res 
        .status(500)
        .json({error: "The posts information could not be retrieved."})
    });
});

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id)
    .then((post) => {
        if(post){
            res.json(post);
        } else {
            res 
            .status(404)
            .json({message: "The post with the specified ID does not exist."})
        }
    })
    .catch(err => {
        res 
        .status(500)
        .json({error: "The post information could not be retrieved."});
    })
});


// listening; watch for connections on port 5000 (defined above)

server.listen(PORT, () => {
    console.log(`server on localhost:5000 is up and running on port ${PORT}`)
})
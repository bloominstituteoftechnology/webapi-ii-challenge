// import your node modules

const express = require('express');     //import express package
const db = require('./data/db.js');     

const server = express();               //creates the server; express is a function

const PORT = 5000;

// CORS stuff
const cors = require('cors')
server.use(cors())

//middleware
const parser = express.json();
server.use(parser);





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

server.post('/api/posts', (req, res) => {
    const post = req.body;
    console.log('post from body', post)
    
    if (post.title && post.contents) {     //if client has specified title and contents, then run POST request

    db.insert(post).then(idInfo => {
        db.findById(idInfo.id).then(post => {
            res.status(201).json(post);    //if don't set status explicitly, defaults to 200; everytime always ask what status you want
        });
    }).catch(err => {
        res 
        .status(500)
        .json({message: "failed to insert post in database"})
    });

    } else {
        //added layer of assurance that user gets more specific error message
        res.status(400).json({message: "status 400: missing title or contents"})
    }
});


server.delete('/api/posts/:id', (req, res) => {
    const {id} = req.params;                    //anything coming from client is attached to req
    db.remove(id).then(count => {               //doc says remove() returns a count of deleted
        if (count) {
            res.json({message: "successfully deleted"});
        } else {
            res 
                .status(404)
                .json({message: "invalid id"});
        }
    }).catch(err => {
        res 
        .status(500)
        .json({message: "fail to delete user"});
    });
});

server.put('/api/posts/:id', (req, res) => { 
    const {id} = req.params;
    const post = req.body;
    //combination of GET, POST, DELETE
    if (post.title && post.contents ) {

    db.update(id, post)
    .then(count => {
        if (count){
            //200 successfully updated (send back our updated user)
            db.findById(id).then(post => {
                res.json(post);
            });
        } else {
            //404 invalid id
            res 
            .status(404)
            .json({message: "invalid id"});
        }
    })
    .catch(err => {
        //500 catchall, something else went wrong
        res 
        .status(500)
        .json({message: "something went wrong, fail to update user"})
    })
    
    } else {
        //400 name or bio is missing
        res.status(400).json({message: "status 400: missing title or content"})
    }
});

// listening; watch for connections on port 5000 (defined above)

server.listen(PORT, () => {
    console.log(`server on localhost:5000 is up and running on port ${PORT}`)
})
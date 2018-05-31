// import your node modules.
const express = require('express');
const cors = require('cors');
const db = require('./data/db');
const port = 5001;

const server = express();
server.use(express.json());

// 1st arg: route where a resource can be interacted with
// 2nd arg: callback to deal with sending responses, and handling incoming data
// Returns an array of all the post objects contained in the database.
server.get('/api/posts', (req, res) => {
     db
        .find()
        .then(posts => {
            res.json({ posts });
        })
        .catch(error => {
            res.status(500).json({ errorMessage: error});
         
        })
});

//Creates a post using the information sent inside the request body.
server.post('/api/posts', (req, res) => {
    const { title, contents } = req.body;
    db
    .insert({ title, contents })
        .then(response => {
            console.log(response);
            res.status(201).send(response) //201 === created
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({errorMessage: 'There was an error while saving the user to the database'});
        })
    });


server.get('/api/posts/:id', (req, res) => {
    // const id = req.params.id; //ES5
    const { id } = req.params; //ES6 Deconstruction 
    console.log('Params:', id);
    db
    .findById(id)
        .then(post => {
            res.json(post);
        })
        .catch(error => {
            res.status(500).json({errorMessage: error});
        })
});

server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db
    .remove(id)
        .then(response => {
            if (response === 0 ) {
                res.status(500).json({errorMessage: 'User with specified ID does not exisit.'});
            } 
            res.json({message: 'User with id ${id} has been removed from the system.'});
        })
        .catch(error => {
            res.status(500).json({errorMessage: 'The user could not be removed.'});
        })
});


// add your server code starting here
server.listen(port, () => console.log('Server is running on port ${port}'));


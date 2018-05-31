// import your node modules.
const express = require('express');
const cors = require('cors');
const db = require('./data/db');
const port = 5001;

const server = express();
server.use(express.json());

// 1st arg: route where a resource can be interacted with
// 2nd arg: callback to deal with sending responses, and handling incoming data
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
    })



// add your server code starting here
server.listen(port, () => console.log('Server is running on port ${port}'));


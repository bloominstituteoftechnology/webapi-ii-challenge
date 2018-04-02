// import your node modules

const db = require('./data/db.js');

// add your server code starting here

const express = require('express');
const server = express();

// Endpoints:

server.get('/', function(req, res) {
    res.send('Api walking fast')
})

server.get('/api/posts', (req,res) => {
    // get data
     db.find()
     // send the data
     .then(posts => {
         res.json(posts);
     })
     // send error if there is one
     .catch(error => {
         res.status(500).json({ error: "The posts information could not be retrieved." });
     });
});

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id).then(users => {
        res.json(users[0]);
    }).catch(error => {
        res.status(404).json({ message: "The post with the specified ID does not exist." });
    });
});
(
    
// server.post('/api/posts', (req, res) => {

// })


const port = 5050;
server.listen(port, () => console.log('API Running on port 5050'));
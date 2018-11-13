// import your node modules
const express = require('express');
const db = require('./data/db.js');

const server = express();

server.get('/', (req, res) => {
    db.find().then(user => {
        res.json(user)})
        .catch(err => {
            res.status(500).json({ message: "we failed"})
        });
});
server.get('/user/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id).then(user => {
        res.json(user)
    }).catch(err => {
        res.status(500).json({ message: "oopsies"})
    });
});
server.listen(3000, () => 
console.log('Server is running at port 3000')
);


// add your server code starting here

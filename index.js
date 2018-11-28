const express = require('express');


const db = require('./data/db.js');

const server = express();
const PORT = 4000;

// add your server code starting here

server.get('/api/posts', (req, res) => {
db.find()
.then((posts) => {
    res.json(posts);
})
.catch(err => {
    res.status(500)
    .json({errorMessage: "Please provide title and contents for the post."})
})

})
server.get('/api/posts/;id', (req, res) => {
    const {id} = req.params;
    db.findById(id)
    .then(post => {
        res.json(post)
    })
    .catch(err => {
        res.status(500)
    })
})

server.listen(PORT, () => {
    console.log(`server is up and running on port ${PORT}`);
});
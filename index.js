// import your node modules

const db = require('./data/db.js');
const express = require('express');
const server = express();
const PORT = 5000;

// add your server code starting here

console.log('foo')

server.get('/', (req, res) => {
    res.send(
        'hi there from our regular get function :D!'
    )
})

server.listen(PORT, () => {
    console.log(`server is alive on port ${PORT}`);
});

server.get('/api/posts', (req, res) => {
    db.find()
    .then(posts => {
        res.json(posts)
    })
    .catch(err => {
        res.status(500)
        res.json(`Huh, can't find those posts`)
    })
})
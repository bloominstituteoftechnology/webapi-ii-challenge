// import your node modules
const express = require('express');
const server = express();
const db = require('./data/db.js');

// add your server code starting here
server.get("/", (req, res) => {
    res.send('Hello');
})
 server.get("/posts", (req, res) => {
    db.find()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            console.error('error', err)
            res.status(500).json({message: 'Failed to retrieve data'})
        })
})
 server.listen(9000, () => console.log(`server`))
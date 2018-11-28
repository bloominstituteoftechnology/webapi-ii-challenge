// import your node modules
const express = require('express');
const db = require('./data/db.js');
const server = express();
// add your server code starting here

const PORT = 4001;

server.get('/api/users', (req, res) => {
    db.find()
        .then((users) => {
            res.json(users)
        })
        .catch(err => {
            res
                .status(500)
                .json({ message: "failed to get users" })
        });
})

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})
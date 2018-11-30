// import your node modules
const express = require ('express')
const server = express()
const db = require('./data/db.js');
const NUM = 4444;
server.use(express.json());

server.get('/api/posts', (req,res) => {

    db.find()
    .then( (posts) => {res.json(posts)})
    .catch(err => {
        res
        .status(500)
        .json({"message": "Failure!"})})
})

// add your server code starting here

server.put('/api/users/:id', (req,res) => {
    res.update(id, req.params({}))
})

server.listen(NUM, () => console.log(`listening on port ${NUM}`))

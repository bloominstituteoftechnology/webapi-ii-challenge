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
        .json({"error": "The posts information could not be retrieved."})})
})

server.get('/api/posts/:id', (req,res) => {
    const {id} = req.params;
    db.findById(id)
    .then( post => {res.json(post)})
    .catch(err => {
        res
        .status(404)
        .json({"message":"The post with the specified ID does not exist."})
    })
})

// add your server code starting here

server.put('/api/users/:id', (req,res) => {
    res.update(id, req.params({}))
})

server.listen(NUM, () => console.log(`listening on port ${NUM}`))

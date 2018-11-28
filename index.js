// import your node modules
const express = require('express');
const db = require('./data/db');

const server = express();
const PORT = 4040;

server.get('/api/posts',(req, res)=>{
    db.find()
        .then(posts =>{
            res.json(posts)
        })
        .catch(err =>{
            res.status(500)
                .json({ error: "The posts information could not be retrieved" })
        })
})

server.get('/api/posts/:id', (req, res)=>{
    const { id } = req.params
    db.findById(id)
        .then((posts =>{
            posts?res.json(posts):
            res.status(404)
            .json({ message: "The post with the specified ID does not exist." })
        }))
        .catch(err=>{
            res.status(500)
            .json({ error: "The posts information could not be retrieved" })
        })
})

server.listen(PORT, ()=>{
    console.log(`server is running on port: ${PORT}`);
})
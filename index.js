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

server.post('/api/posts', (req, res)=>{
    const { title, contents } = req.query
    db.insert({ title, contents })
        .then((id =>{
           !title||!contents?res.status(400)
           .json({ errorMessage: "Please provide title and contents for the post." })
           :res.json({id, title, contents})
        }))
        .catch(err=>{
            res.status(500)
                .json( { error: "There was an error while saving the post to the database" })
        })
})

server.delete('/api/posts/:id', (req, res)=>{
    const { id } = req.params;
    const post = db.findById(id)
    db.remove(id)
        .then(records=>{
            records?res.json(post):res.status(404).json({ message: "The post with the specified ID does not exist." })
        })
        .catch(err=>{
            res.status(500)
                .json({ error: "The post could not be removed" })
        })
})

server.put('api/posts/:id', (req, res)=>{
    const { id } = req.params;
    const { title, contents} = req.query;
    !title||!contents?res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    :db.update(id, { title, contents })
        .then(record =>{
            record?res.json({ id, title, contents })
            :res.status(404)
            .json({ message: "The post with the specified ID does not exist." })
        })
        .catch(err=>{
            res.status(500)
                .json({ error: "The post information could not be modified." })
        })
})

server.listen(PORT, ()=>{
    console.log(`server is running on port: ${PORT}`);
})
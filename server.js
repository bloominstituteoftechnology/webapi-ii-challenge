// import your node modules

const db = require('./data/db.js');
const express = require('express');
const server = express();


server.use(express.json());
// add your server code starting here
server.listen(8000, () => console.log('API running...'))




server.get('/posts', (req, res) => {
    db.find()
    .then(posts => {
        res.json(posts)
})
.catch(() => {
    res.status(500).json({ error: "The posts information could not be retrieved."})
})
})


server.get('/posts/:id', (req, res) => {
    const id = req.params.id 
    db.findById(id)
    .then(response => {
        if (response.length === 0) {
            res.status(404).json({ message: "The post with the specified ID does not exist."})
        }
        else{
            res.status(200).json(response)
        }
    })
    .catch(() => {
        res.status(500).json({ error: "The post information could not be retrieved."})
    })
})


server.post('/posts', (req, res) => {
    const post = req.body;
    if (post.title == null || post.contents == null) {
        res.status(400).json({message: 'Please provide title and contents for the post.'})
    }
    db.insert(post)
    .then(post => {
        res.status(201).json(post)
    })
    .catch(() => {
        res.status(500).json({ error: 'There was an error while saving the post to the database'})
    })
})

server.delete('posts/:id', (req, res) => {
    const {id} = req.params;
    db.remove(id)
    .then(response => {
        if (response >= 1) {
            res.status(200).json(response)
        } else{
            res.status(404).json({ message: 'The post with the specified ID does not exist'})
        }
    })
    .catch (() => {
        res.status(500).json({ error: 'the post could not be removed'})
    })
})

server.put('/post/:id', (req, res)=> {
    const {id} = req.params;
    const {post} = req.body;

    if (post.title == null || post.contents == null) {
        res.status(400).json({ errorMessage: 'Please provide title and contents for the post.'})
    }
    db.findById(id)
    .then(response => {
        if (response.length < 1) {
            res.status(404).json({ message: 'The post with the specified ID does not exist.'})
        } else {
            res.status(200).json(response)
        }
    })
    .catch(()=> {
        res.status(500).json({error: 'The post information could not be modified.'})
    })
})
// import your node modules
const express = require('express');
const db = require('./data/db.js');

// add your server code starting here

const server = express();
server.use(express.json());

server.get('/api/posts', async (req, res) => {
    try{
        const posts = await db.find();
        res.status(200).json(posts)
    } catch(err) {
        res.status(500).json({ error: "The posts information could not be retrieved." })
    }
})

server.get('/api/posts/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try{
        const post = await db.findById(id)
        res.status(200).json(post)
    } catch(err) {
        res.status(500).json({ message: "The post with the specified ID does not exist." })
    }
})

server.post('/api/posts', async (req, res) => {
    const { title, contents } = req.body;

    if(!title || !contents){
        res.status(400).json({ "errorMessage": "Please provide title and contents for the post." })
    }

    const post = {
        "title": title,
        "contents": contents
    }
    
    try{
        const returnPost = await db.insert(post);
        res.status(201).json(returnPost)
        
    } catch(err) {
        res.status(500).json({ error: "There was an error while saving the post to the database" })
    }
})

server.listen(8000, () => console.log('API running on port 8000'));
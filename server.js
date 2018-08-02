const express = require('express');
const helmet = require('helmet');
const db = require('./data/db');

const port = 8000;
const server = express();
server.use(helmet());
server.use(express.json());


server.get('/', (req, res) => {
    res.send('Hello World');
});

server.get('/api/posts', async (req, res) => {
    try {const response = await db.find();
        res.status(200).json(response);
    } 
    catch (error) {
        res.status(500).json({ error: "Post not retrieved" })
    }
})

server.get('/api/posts/:id', async (req, res) => {
    try {
        const response = await db.findById(req.params.id);
        if (response.length === 0) {
            res.status(404).send({ message: "Post does not exist" });
        } 
        else {
            res.status(200).json(response)
        }
}   catch (error) {
        res.status(500).send({ error: "Post not retrieved" });
    }
})

server.post('/api/posts',async (req, res) => {
    if (!('contents' in req.body && 'title' in req.body)) {
        return res.status(400).send({ errorMessage: "Missing title and content" })
    }
    try {
        await db.insert(req.body);
        res.status(201).json(req.body);
    } 
    catch(error) {
        res.status(500).send({ error: "Failure to save" })
    }
})

server.delete('/api/posts/:id', async (req, res) => {
    try {
        const deleted = await db.findById(req.params.id);
        if (deleted.length === 0) {
            return res.status(404).send({ message: "Post does not exist" });
        }
        await db.remove(req.params.id);
        res.status(200).json(deleted[0])
    } 
    catch (error) {
        res.status(500).send({ error: "Failure to remove post" });
    }
})

server.put('/api/posts/:id',async (req, res) => {
    if (!('contents' in req.body && 'title' in req.body)) {
        return res.status(400).send({ errorMessage: "Please provide title and contents for the post." })
    }
    try {
        const response = await db.update(req.params.id, req.body);
        if (response===0) {
            res.status(404).send({ message: "Post does not exist" });
        } else {
            const newPosts = await db.find();
            res.status(200).json(newPosts);
        }
}   catch(error){
        res.status(500).send({ error: "Failure to modify" })
    }
})

server.listen(8000, () => console.log('API running on port 8000')); 
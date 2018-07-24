// import your node modules

const db = require('./data/db.js');
const helmet = require('helmet');
const express = require('express');

// add your server code starting here
const server = express();

//use middleware
server.use(express.json());
server.use(helmet());

//Create endpoint for GET
server.get('/api/posts', async (req, res) => {
    try {
        const response = await db.find();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: "The posts information could not be retrieved." })
    }
})

//Create endpoint for GET by ID
server.get('/api/posts/:id', async (req, res) => {
    try {
        const response = await db.findById(req.params.id);
        if (response.length === 0) {
            res.status(404).send({ message: "The post with the specified ID does not exist." });
        } else {
            res.status(200).json(response)
        }
    } catch (error) {
        res.status(500).send({ error: "The post information could not be retrieved." });
    }
})

//Create endpoint for POST
server.post('/api/posts',async (req, res) => {
    if (!('contents' in req.body && 'title' in req.body)) {
        return res.status(400).send({ errorMessage: "Please provide title and contents for the post." })
    }
    
    try {
        await db.insert(req.body);
        res.status(201).json(req.body);
    } catch(error) {
        res.status(500).send({ error: "There was an error while saving the post to the database" })
    }
})

//Create endpoint for DELETE
server.delete('/api/posts/:id', async (req, res) => {
    try {
        const deleted = await db.findById(req.params.id);
        if (deleted.length === 0) {
            return res.status(404).send({ message: "The post with the specified ID does not exist." });
        }

        await db.remove(req.params.id);
        res.status(200).json(deleted[0])
    } catch (error) {
        res.status(500).send({ error: "The post could not be removed" });
    }
})

//Create endpoint for PUT
server.put('/api/posts/:id',async (req, res) => {
    if (!('contents' in req.body && 'title' in req.body)) {
        return res.status(400).send({ errorMessage: "Please provide title and contents for the post." })
    }
    try {
        const response = await db.update(req.params.id, req.body);
        if (response===0) {
            res.status(404).send({ message: "The post with the specified ID does not exist." });
        } else {
            const newPosts = await db.find();
            res.status(200).json(newPosts);
        }
    } catch(erro){
        res.status(500).send({ error: "The post information could not be modified." })
    }
})

server.listen(8000, () => console.log('API running on port 8000'));
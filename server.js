// import your node modules

const db = require('./data/db.js');

// add your server code starting here
const express = require('express');

const server = express();

server.use(express.json());

server.post('/api/posts', async (req, res) => {
    try {
        const { title, contents } = req.body;
        if(title == undefined || contents == undefined) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post"});
        res.end();
        return;
        }
        const post = await db.insert({ title, contents });
        res.status('201').json(post);
    } 
    catch (err) {
        res.status(500).json({ error: 'There was an error while saving the post to the database'});
        res.end();
    }
})

server.get('/api/posts', async (req, res) => {
    try {
        const posts = await db.find();
        res.status(200).json(posts);
    }
    catch (err)  {
        res.status(500).json({ error: 'The posts information could not be retreived'});
        res.end();
    }
})

server.get('/api/posts/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const post = await db.findById(id);
        if(post.length === 0) {
            res.status(404).json({ message: 'The post with the specified ID does not exist'});
            res.end();
            return;
        }
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ error: 'The post information could not be retreived'});
    }
});

server.put('/api/posts/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const { title, contents } = req.body;
        if(title === undefined || contents === undefined) {
            res.status(400).json({ errorMessage: 'Please provide title and contents for the post'});
            res.end();
            return;
        }
        const putResponse = await db.update(id, req.body);
        res.status(200).json(putResponse);
    }
    catch(err) {
        res.status(500).json({ error: 'The post information could not be modified.'});
        res.end();
    }
});
server.delete('/api/posts/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const deleteResponse = await db.remove(id);
        if(deleteResponse === 0) {
            res.status(404).json({message: 'The post with the specified ID does not exist.'});
            res.end();
            return;
        }
        res.status(200).json(deleteResponse);
        return;
    } 
    catch(err)  {
        res.status(500).json({ error: 'The post could not be removed'});
        res.end();
    }
});

server.listen(8001);
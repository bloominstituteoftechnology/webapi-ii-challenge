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
        const users = await db.find();
        res.status(200).json(users);
    }
    catch (err)  {
        res.status(500).json({ error: 'The posts information could not be retreived'});
        res.end();
    }
})


server.listen(8001);
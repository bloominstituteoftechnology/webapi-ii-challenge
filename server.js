// import your node modules
const express = require('express')
const server = express()
const db = require('./data/db.js');

// add your server code starting here
server.get('/', (req,res) => {
    res.send('API RUNNING');
});

server.post('/api/posts', (req,res) => {
    const post = req.body;
    if (!post ) {
        res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' })
    }
    db
    .insert(post)
    then(posts =>
    res.status(201).json(posts))
    .catch(err =>{
        res.status(500).json({ error: "There was an error while saving the post to the database" })
    })
})
server.get('/api/posts', (req, res) => {
    db
    .find()
    .then(posts => {
        res.json(posts);
    })
    .catch(err =>{
        res.status(500).json({ error: "The posts information could not be retrieved." })
    })
})

server.get('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    db
    .findById(id)
    .then(posts => {
        if (posts.length == 0)
        res.status(404).json({ message: 'The post with the specified ID does not exist'});
        res.json(posts);
    })
    .catch(err =>{
        res.status(500).json({ error:'The post information could not be retrieved.' })
    })
})

server.delete('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    db
    .remove(id)
    res.status(404).json({ message: 'The post with the specified ID does not exist'});
    res.json()
    .catch(err =>{
        res.status(500).json({ error:'The post could not be removed.' })
    })
})


server.listen(5000, () => console.log('\n== API RUNNING ON PORT 5000==\n'));
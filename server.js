// import your node modules
const express = require('express');

const db = require('./data/db.js');

// add your server code starting here

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('This is working')
});

server.get('/posts', (req, res) => {
    db.find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            console.log('error', err);

            res.status(500).json({ error: 'The posts information could not be retrieved.' })
        })
})

server.get('/posts/:id', (req, res) => {
    db.findById(req.params.id)
        .then(post => {
            res.status(200).json(post);
        })
        .catch(err => {
            console.log('error', err);

            res.status(404).json({ message: "The post with the specified ID does not exist." })
        })
})

server.delete('/posts/:id', (req, res) => {
    db.remove(req.params.id)
        // .then(
        //     console.log(post);
        //     res.status(200).json({
        //         url: `/posts/${req.params.id}`,
        //         operation: `DELETE for post with id ${req.params.id}`
        //     })
        // )
        .then(post => {
            console.log(post)
            res.status(200).json(post);
        })
        .catch(err => {
            console.log('error', err);

            res.status(404).json({ message: "The post with the specified ID does not exist." })
        })
})

server.listen(8000, () => console.log('\n== API on port 8k==\n'))

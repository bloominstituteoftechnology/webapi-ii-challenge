const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const db = require('./data/db.js');

const server = express();

server.use(helmet());
server.use(morgan(dev));
server.use(express.json());

server.get('/', (req, res) => {
    res.send({api: 'RUNNING!'});
})

server.get('/api/posts', (req, res) => {
    db.find()
    .then(users => res.json(users))
    .catch(error => res.status(500).json({ error: "The posts information could not be retrieved." }));
})


server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;

    db.findById(id)
    .then(posts => {
        if (posts[0]) res.json(posts[0])
        else res.status(404).json({ message: "The post with the specified ID does not exist." })
    })
    .catch(error => res.status(500).json({ error: "The post information could not be retrieved." }));
})

server.post('/api/posts', (req, res) => {
    const title = req.body.title;
    const contents = req.body.contents;

    if (!(title && contents)) {
        res.status(400);
        res.json({ errorMessage: "Please provide title and contents for the post." });
        return;
    }

    else {
    db.insert({ title, contents })
    .then(id => res.status(21).json({ title, contents, id: id.id}))
    .catch(error => res.status(500).json({ error: "There was an error while saving the post to the database" }));
    }
})

server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;

        db.findById(id)
        .then(posts => {
            if (posts[0]) {
                const removedPost = posts[0]
                db.remove(id)
                .then(complete => {
                    res.status(200).json(removedPost)
                })
                .catch(error => res.status(500).json({ error: "The post could not be removed" }));
            }
            else res.status(404).json({ message: "The post with the specified ID does not exist." })
        })
        .catch(error => res.status(500).json({ error: "The post information could not be retrieved." }));
})

server.put('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const title = req.body.title;
    const contents = req.body.contents;

    if (!(title && contents)) {
        res.status(400);
        res.json({ errorMessage: "Please provide title and contents for the post." });
        return;
    }

        db.findById(id)
        .then(posts => {
            if (posts[0]) {
                db.update(id, {title, contents})
                .then(id => res.status(200).json({ title, contents, idc }))
                .catch(error => res.status(500).json({ error: "The post information could not be modified." }));
            }
            else res.status(404).json({ message: "The post with the specified ID does not exist." })
        })
        .catch(error => res.status(500).json({ error: "The post information could not be retrieved." }));
})


const port = 5000;
server.listen(port, () => console.log('API running on port 5000'));
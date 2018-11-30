const express = require('express');
swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');

const db = require('./data/db.js');
const router = express.Router()
const server = express();
server.use(express.json());
const PORT = 4000;

server.get('/api/posts', (req, res) => {
    db.find()
        .then(posts => res.json(posts))
        .catch(err => 
        res.status(500)
        .json({error: "The posts information could not be retrieved."})
        )
})

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id)
        .then(post => post.length ? res.json(post) : res.status(404).json({message: "The post with the specified ID does not exist."}))
        .catch(err => 
        res.status(500)
        .json({error: "The post information could not be retrieved."})
        )
})

server.post('/api/posts/', (req, res) => {
    const post = req.body;
    if(!post.title||!post.contents){res.status(400).json({ errorMessage: "Please provide title and contents for the post." })}
    else {
    db.insert(post)
        .then(idInfo => db.findById(idInfo.id).then(post => res.status(201).json(post[0])))
        .catch(err => res.status(500).json({error: "There was an error while saving the post to the database"}))}
})

server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;    
    const post = db.findById(id).then(post => post);
    db.remove(id)
        .then(records => records ? res.json(post) : res.status(404).json({message: "The post with the specified ID does not exist."}))
        .catch(err => res.status(500).json({error: "The post could not be removed"}))
    }
)

server.put('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const post = req.body;
    if(!post.title||!post.contents){res.status(400).json({errorMessage: "Please provide title and contents for the post."})}
    else{
        db.update(id, post)
            .then(records => records ? db.findById(id).then(post => res.json(post)) : res.status(404).json({message: "The post with the specified ID does not exist."}))
            .catch(err => res.status(500).json({error: "The post information could not be modified."}))
        }
    }
)

server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
server.use('/api/posts', router)

server.listen(PORT, () => console.log(`Server is up and running on port ${PORT}`));
// import your node modules
const bodyParser = require('body-parser');
const express = require('express');
const db = require('./data/db.js');
const morgan = require('morgan');
const helmet = require('helmet');

// add your server code starting here
const port = 5000;

const server =  express();
server.use(bodyParser.json())
server.use(morgan('dev'));
server.use(helmet());

server.get('/', (req, res) => {
    res.send({api: 'RUN TO THE SETTING SUN'});
})

server.get('/api/posts', (req, res) => {
    db.find()
    .then( users => res.json(users))
    .catch(error => res.status(500).json({ error: "Info Not Retrieved"}));
})

server.get('api/posts/:id', function(req, res) {
    const { id } = req.params;
    db.findById(id)
    .then(posts => {
        if (posts[0]) res.json(posts[0])
    else res.status(404).json({ message: "Specific ID Doesn't Exist"})
    })
    .catch(error => res.status(500).json({ error:"Info Not Retrieved"}));
})

server.put('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const updatePost = { title, content };
    if (!title || !content) {
        res.status(400).json({
            errorMessage: "Enter Title and Content"
        });
        return;
    }
    db.findById(id)
    .then(posts => {
        if (posts[0]) {
db.update(id, {title, content})
.then(id => res.status(200).json({ title, content }))
.catch(error => res.status(500).json({ error: "Can't Be Modified"}));
        }
        else res.status(404).json({ message: "Specific ID Doesn't Exist"})
    })
    .catch(error => res.status(500).json({ error: "Info Not Retrieved"}));
})

server.post('api/posts', function(req, res) {
    const { title, content } = req.body;
    if (!title || !content) {
        res.status(400).json({ errorMessage: "Enter Title and Content"})
    }
    console.log(post)
    db
    .insert(post)
    .then(posts => {
        res.status(201).json(posts);
    })
    .catch(error => {
        res.status(500).json({error: "Can Insert In DB"})
    })
})

server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id)
    .then(posts => {
        if (posts[0]) {
            const removePost = posts[0]
            db.remove(id)
            .then(complete => {
                res.status(200).json(removePost)
            })
            .catch(error => res.status(500).json({ error: "Can Not Be Removed"}));
        }
        else res.status(404).json({ message: "Specific ID Doesn't Exist"})
    })
    .catch(errror => res.status(500).json({ error: "Info Not Retrieved"}));
})

server.listen(port, () => console.log('API On Port 5000'));
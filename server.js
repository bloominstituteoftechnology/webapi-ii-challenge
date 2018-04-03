const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const db = require('./data/db.js');

const server = express();
server.use(morgan('dev'));
server.use(helmet());
server.use(express.json());

server.get('/api/posts', (req, res) => {
    db
    .find()
    .then(posts => {
        res.json(posts)
    })
    .catch(error => {
        res.status(500).json({ error: "The posts information could not be retrieved." });
    });
});

server.get('/api/posts/:id'), (req, res) => {
    console.log(req);
    const { id } = req.params;
    res.json(200).json('Created');

    // db
    // .findById(id)
    // .then(response => {
    //     console.log('response', response);
    // })
    // .catch(error => {
    //     res.status(500).json({ errorMessage: "The post information could not be retrieved." });
    // })
};

server.post('/api/posts', (req, res) => {
    const { title, contents } =req.body;
    if (!title || !contents) {
        return res.status(400).json({ errorMessage: 'Please provide title and contents for post'});
    }
    const newPost = {
        title,
        contents
    }

    db
    .insert(newPost)
    .then(id => {
        const post = {...newPost, id}
        res.status(201).json({ created: "Created" });
    })
    .catch(error => {
        res.status(500).json({ error: "There was an error while saving the post to the database" });
    });
});



// console.log('hello');
const port = 5001;
server.listen(port, () => {
    console.log('Server running on port 5001');
})

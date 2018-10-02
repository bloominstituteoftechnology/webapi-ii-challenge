// import your node modules
const express = require('express');
const db = require('./data/db.js');
const cors = require('cors');

/* DEPRECATED */
// const bodyParser = require('body-parser');

const server = express();
// prevent CORS errors on localhost
server.use(cors());
// tell server to speak in JSON
server.use(express.json());

/* DEPRECATED */
// server.use(bodyParser.json());
// server.use(bodyParser.urlencoded({extended: true}));

const port = 8000;
server.listen(port, () => {
    console.log(`\n *** API Running on Port ${port} *** \n`);
})

// server.get('/', (req, res) => {
//     res.send('Please visit /api/users/');
// })

server.get('/api/posts', (req, res) => {
    db.find()
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => res.send(err));
})

// POST

server.post('/api/posts', (req, res) => {
    const { title, contents } = req.body;
    const newPost = {title, contents};
    db.insert(newPost)
    .then(id => {
        res.status(201).json({"New Post Added with ID#": id});
    })
    .catch(err => res.send(err));
})

// GET POST BY ID
server.get('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    db.findById(id)
    .then(post => {
        res.status(200).json(post[0]);
    })
    .catch(err => res.send(err))

})

// DELETE



// PUT
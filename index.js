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
    .catch(err => {
        console.log(err);
        res.status(500).json({error: "The posts information could not be retrived."});
    })
    })

// POST

server.post('/api/posts', (req, res) => {
    const { title, contents } = req.body;
    const newPost = {title, contents};

    if(!newPost.title || !newPost.contents){
        res.status(400).json({errorMessage: "Please provide title and contents for the post."}).end();
    } else {
    db.insert(newPost)
    .then(id => {
        res.status(201).json({"New Post Added with ID#": id});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: "There was an error while saving the post to the database."});
        })
    }
});

// GET POST BY ID
server.get('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    db.findById(id)
    .then(post => {
        if(!post[0]){
            res.status(404).json({message: "The post with the specified ID does not exist."})
        } else {
        res.status(200).json(post[0]);
        }
    })
    .catch(err => {
        console.log(err);   
        res.status(404).json({message: "The post with the specified ID does not exist."});
    })
})

// DELETE

server.delete('/api/posts/:id', (req, res) => {
    const id = req.params.id;

    db.remove(id)
    .then(posts => {
        console.log(posts);
        res.status(200).json({message: "Post successfully deleted."});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: "The post could not be removed."})
    })
})


// PUT
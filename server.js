const express = require('express');
const helmet = require('helmet');
// const morgan = require('morgan')
const db = require('./data/db.js');

const server = express();

//middleware
// server.use(morgan('dev'));
server.use(helmet());
server.use(express.json());

server.get('/', function(req, res){
    res.send({api:'me'});
});

server.get('/api/posts', (req, res) => {
    db.find().then(posts => {
        res.json(posts);
    }).catch(error => {
        res.status(500).json({message: "The Post with the specified ID does not exist"});
    });

});

server.get('/api/posts/:id', (req,res) => {
    const { id } = req.params;
    db
    .findById(id)
    .then(posts => {
        if (!posts[0]) res.status(404).json({ message: "The post with the specified ID does not exist." })
        else res.json(posts[0]);
    })
    .catch(error => {
        res.status(500).json({error: "The post information could not be retrieved."})
    });
});

server.post('/api/posts', (req,res) => {
    const {title,contents} = req.body;
    if (!title || !contents) {
        res.status(400).json({errorMessage:"Please provide title and contents for the post"})
    } 
    else {
        const post = {title, contents}
        db.insert(post) .then(post => {
            res.status(201).json({post})
        .catch(error => {
            res.status(500).json({error:"There was an error while saving the post to the database"})
        })})
    }
});

// server.post('/api/posts', (req, res) => {
//     const 
// } )

const port = 5000;
server.listen(port, () => console.log('API Running on port 5000'));
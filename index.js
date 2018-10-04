// import your node modules
const express = require('express');
const cors = require('cors');

const db = require('./data/db.js');

const server = express();


// add your server code starting here
server.use(cors());

server.use(express.json());

server.post('/api/posts', (req, res) => {
    console.log(req.body);
    const { title, contents } = req.body;
    const newPost = { title, contents };
    db.insert(newPost)
        .then(postId => {
            const { id } = postId;
            db.findById(id)
            .then(post => {
                if (!post) {
                    return res.status(404).json({message: `The post with the specified ID does not exist ( ${id})`});
                }
                res.status(201).json(post);
            })
            .catch(() => res.status(500).json({ error: "There was an error while saving the post to the database."}))
        })
        .catch(() => res.status(400).json({ error: "Please provide title and contents for the post."}))
        });

server.get('/', (req,res) => {
    res.send('<h1>Michael Hacker - Node Express Lab Assignment</h1>');
});

server.get('/api/posts', (req, res) => {
    db.find()
    .then(posts => {
        console.log('\n** posts **', posts);
        res.status(200).json(posts);
    })
    .catch(() => res.status(500).json({ error: "The posts information could not be retrieved."}));
})

server.get('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    db.findById(id)
    .then(post => {
        if (post.length === 0) {
            return res.status(404).json({message: "The post with the specified ID does not exist."})
        }
        console.log('\n** POST **', post);
        res.status(200).json(post);
    })
    .catch(() => res.status(500).json({ error: "The post information could not be retrieved."}));
    
})

server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db.remove(id)
    .then(removedUser => {
        res.status(200).json(removedUser)
    })
    .catch(err => res.send(err));
})

server.put('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const {title, contents} = req.body;
    const newPost = { title, contents };
    db.update(id, newPost)
        .then(post => {
            res.status(200).json(post);
        })
        .catch(err => res.send(err));
})

const port = 8000;
server.listen(port, () => console.log(`API running on port ${port}`));
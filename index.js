// import your node modules
const express = require('express');
const db = require('./data/db.js');
const cors = require('cors') // needed to connect to react



// add your server code starting here

const server = express(); // creates the server

server.use(cors()); // this needed to connect from react
server.use(express.json()); // selects language to communicate with(formatting our req.body object)

server.get('/', (req, res) => { // request route handler
    res.send('Awaken');
});

server.post('/api/posts', (req, res) => {
    console.log(req.body);
    const { title, contents} = req.body;
    const newPost = { title, contents};
    db.insert(newPost)
    .then(insertedPost => {
        res.status(201).json({'Post created': insertedPost});
    })
    .catch(err => {
        res.send(err);
    });
})



// get posts from the api 
server.get('/api/posts', (req, res) =>{
    db.find()
        .then(posts => {
            console.log('\n** posts **', posts);
            res.json(posts);
        })
        .catch(err => {
            console.log(err);
            res.json({ error: "Uhh we can't seem to find your posts..."});
        });
});

//get single post from the api
server.get('/api/posts/:id', (req, res) =>{
    const { id } = req.params;
    db.findById(id)
        .then(posts => {
            console.log('\n** posts **', posts);
            res.json(posts);
        })
        .catch(err => {
            console.log(err);
            res.json({ error: "Uhh we can't seem to find your post..."});
        });
});

server.post('/api/posts', (req, res) =>{
    const { title, contents } = req.body;
    const newPost = { title, contents };
    db.insert(newPost)
    .then(postId => {
        const { id } = postId;
        db.findById(id).then(post => {
            console.log(post);
            if (!post) {
                return res
                    .status(422)
                    .send({ Error: `post does not exist by that ${id}`});
            }
            res.status(201).json(post);
        });
    })
    .catch(err => console.error(err))
})

server.delete('/api/posts/:id', (req, res) => {
    console.log(req.params);
    const { id } = req.params;
    db.remove(id)
    .then(removedPost =>{
        console.log(removedPost);
        res.status(200).json(removedPost);
    })
    .catch(err => console.error(err));
});

server.put('/api/posts/:id', (req, res) =>{
    const { id } = req.params;
    const { title, contents } = req.body;
    const newPost = { title, contents};
    db.update(id, newPost)
        .then(post => {
            console.log(post);
            res.status(200).json(post);
        })
        .catch(err => console.error(err));
});

// watch for traffic in a particular computer port
const port = 9000;
server.listen (port, () => 
console.log(`\n=== API running on port ${port} ===\n`)
);
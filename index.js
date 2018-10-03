// import your node modules

const express = require('express');

const cors = require('cors');

const db = require('./data/db.js');

const server = express();

server.use(cors());

server.use(express.json());


// add your server code starting here

// server.get('/', (req, res) => {
//     res.send('Is this working?');
// });
///Request handler

server.get('/api/posts', (req, res) => {
        db
        .find()
        .then(posts => {
            console.log('\n** posts **', posts);
            res.json(posts);
        })
        .catch(err => res.status(500).send(err === 'The posts informations could not be retrieved.'));
});

server.get('/api/posts/:id', (req, res) => {
    db.findById(req.params.id)
    .then( posts => {
        res.json(posts);
    })
    .catch(err => res.status(404).send(err.message === 'The post with the specified ID does not exist.'));
});

server.post('/api/posts', (req, res) => {
    console.log(req.body);
    const { title, contents } = req.body;
    const newPost = { title, contents };
    db.insert(newPost)
    .then(postId => {
        const { id } = postId;
        db.findById(id)
        .then(post => {
            console.log(post);
            if (!post) {
                return res
                .status(400)
                .send({ Error: `Post of id ${id} does not exist`});
            }
            res.status(201).json(post);
        });
    })
    .catch(err => console.error(err))
});

///Come back to this section///
server.delete('api/posts/:id', (req, res) => {
    const { id } = req.params;
    console.log(params);
    db
    .remove(id)
    .then(removedPost => {
        console.log(removedPost);
        res
        .status().send(removedPost);
    })
    .catch(err => console.log(err))
});

////Observe the variable statements here. Understand why we are configuring as such.

server.put('/api/posts/:id' , (req, res) => {
    const { id } = req.params;
    const { title, contents } = req.body;
    const newPost = { title, contents};
        console.log(newPost);
    db
    .update(id, newPost)
    .then(user => {
        console.log(user);
        res.status(200).json(user);
    })
    .catch(err => console.error(err));
})

const port = 8000
server.listen(port, () => console.log(`\n=== API is running on port ${port} ===\n`));
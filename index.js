// import your node modules
const express = require('express');
const server = express();

server.use(express.json());
const db = require('./data/db.js');

server.get('/api/posts', (req, res) => {
    db.find()
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        res
        .status(500).json({message: "The posts information could not be retrieved foo" })
    })
});

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;

    db.findById(id)
    .then(post => {
        console.log(post[0].id);
        console.log(id);
        if (post.length === 0) {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        } else {res.status(200).json(post)}
    })
    .catch(err => {
        res
        .status(500).json({ error: "The post information could not be retrieved.", err })
    })
})

server.post('/api/posts', async (req, res) => {
    console.log("body:", req.body);
    try {
        const userData = req.body;
        const userId = await db.insert(userData);
        const user = await bd.findById(userId.id);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: 'error creating post', error })
    }
})

server.delete('/api/posts/:id', (req, res) => {
    db.remove(req.params.id)
    .then(count => {
        if (count) {
         res.status(204).json({ message: `${count} post was deleted` });   
        } else {res.status(404).json({ message: `404 ${count} post not found` })}
        
    })
    .catch(error => {
        res.status(500).json( { message: "There was an error deleting post", error } )
    })
});

server.put('/api/posts/:id', (req, res) => {
    db.update(req.params.id, req.body)
    .then(count => {
        if(count){
        res.status(200).json(`${count} post was updated`)     
        } else{ res.status(404).json({ message: 'post does not exist' }) }
       
    })
    .catch(error => {
        res.status(500).json({ message: 'Error Updating The Post', error })
    })
})

server.get('/posts', (req, res) => {
    console.dir('request object\n', req, { depth: 0 });
    const { id } = req.query;

    if (id) {
        db.findById(id).then(users => res.send(users));
    } else {
        db.find().then(users => res.send(users));
    }
})

// add your server code starting here

server.listen(9000, () => console.log("\n ==Wussup Buttercup: api running on port 9000== \n"));
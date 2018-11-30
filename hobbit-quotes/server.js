const express = require('express');
const server = express();
const db = require('./data/db.js');

server.use(express.json());

server.get('/api/posts', (req, res) => {
    db.find()
        .then((posts) => {
            res.json(posts)
        })
        .catch(err => {
            res
            .status(500)
            .json({message: "Could not fetch your posts. Sad day."})
        })
})

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id)
        .then(post => {
           if(post) {
               res.json(post[0])
           } else {
               res
               .status(404)
               .json({message: "This post doesn't exist. Did you imagine it?"})
           }
        })
        .catch(err => {
            res
            .status(500)
            .json({message: "Failed to find that post. It's off playing hide and seek. Perhaps you should look harder..."})
        })
})

server.post('/api/posts', (req, res) => {
    const post = req.body;
    if (post.title && post.contents) {
        db.insert(post)
            .then(postID => {
                db.findById(postID.id)
                    .then(post => {
                        res
                        .status(201)
                        .json(post[0])
                    })
            })
            .catch(err => {
                res
                .status(500)
                .json({ message: "Cannot add this new post. It's too stubborn to join." })
            })
    } else if (post.title) {
        res
        .status(400)
        .json({message: "New posts need a title, not just content. Otherwise, how do we know what it's all about?"})
    } else if (post.contents) {
        res
        .status(400)
        .json({message: "New posts need content. Empty posts are just soulless creatures."})
    } else {
        res
        .status(400)
        .json({message: "New posts need a title and content, obviously."})
    }
})

server.delete('/api/posts/:id', (req, res) => {
    const {id} = req.params;
    db.findById(id)
        .then(post => {
            if (post) {
                const thePost = post[0];
               db.remove(id)
                .then(count => {
                    if (count){
                        res
                        .json(thePost)
                    }
                })
            } else {
                res
                .status(404)
                .json({ message: "Invalid ID. Are you sure that's who you were looking to vanquish?" })
            }
        })
    .catch(err => {
            res
            .status(500)
            .json({ message: "This post is invulnerable to your attacks and could not be deleted." })
    })
})

server.put('/api/posts/:id', (req, res) => {
    const {id} = req.params;
    const post = req.body;

    if (post.title && post.contents){
        db.update(id, post)
        .then(count => {
            if(count){
                db.findById(id)
                    .then(post => {
                        res.json(post[0])
                    })
            } else {
                res
                .status(404)
                .json({ message: "Invalid ID. Are you sure that's what you were looking to change?"})
            }
        })
        .catch(err => {
            res
            .status(500)
            .json({ message: "There was an error updating this post. It rejected your changes as unacceptable." })
        })
    } else if (post.title) {
        res
        .status(400)
        .json({ message: "Your updated post needs contents. What is an empty post? Worthless!" })
    } else if (post.contents) {
        res
        .status(400)
        .json({ message: "Your updated post needs a title. How else will we know what it's all about?" })
    } else {
        res
        .status(400)
        .json({ message: "Your updated post needs a title and contents. Why are you just adding empty air? Stop wasting The Internet Gods' time!" })
    }
})


server.listen(3000, (err)=> {
    if (err) console.log(err);
    console.log('Server works. Go. Awesome.');
})

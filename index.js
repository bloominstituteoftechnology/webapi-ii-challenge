// import your node modules
const express = require('express');
const server = express();
const db = require('./data/db.js');

//middleware to allow us to use req.body
//body is like an outer shell
//further request the key value by using req.body.VALUE
server.use(express.json());
// const { title, contents } = req.body


// add your server code starting here

server.get('/api/posts', (req, res) => {
    db.find()
        .then((posts) => {
            console.log(posts)
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
                .json({ message: "Cannot add this new post" })
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
        .json({message: "New posts need a title and content"})
    }
})

server.delete('/api/posts/:id', (req, res) => {
    const {id} = req.params;
    db.remove(id)
        .then(count => {
            console.log(count)
        })
        .catch(err => {
            res
            .status(500)
            .json({ message: "Post is invulnerable to your attack and cannot be deleted." })
        })
})

server.listen(3000, ()=> {
    console.log('Server works. Go. Awesome.')
})

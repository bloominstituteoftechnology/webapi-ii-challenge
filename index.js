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
               res.json(post)
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

server.listen(4000, ()=> {
    console.log('Server works. Go. Awesome.')
})

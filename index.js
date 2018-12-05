// import your node modules

const db = require('./data/db.js');
const express = require('express');
const server = express();
const PORT = 4000;

server.use(express.json());



// add your server code starting here

console.log('hello world')

server.get('/', (req, res) => {
    res.send(
        'hi there from our regular get function! ~_~'
    )
})

// endpoint shenanigans

server.get('/api/posts', (req, res) => {
    db.find()
    .then(posts => {
        res.json(posts)
    })
    .catch(err => {
        res.status(500)
        res.json(`Huh, can't find those posts`)
    })
})


server.get('/api/posts/:id', (req, res) => {
    const {id} = req.params;
    db.findById(id)
    .then(post => {
        if(post) {
            res.json(post);
        } else {
            status(404)
            res.json('Error 404: Idk that post')
        }
    })
    .catch(err => {
        res.status(500)
        res.json('Error 500: Idk that post')
    })
})

// post req
// also: error catching if post is missing either a title or contents


server.post('/api/posts', (req, res) => {
    const posts = req.body;

    if (posts.title && posts.contents) {
    console.log('post from body:', posts)
    db.insert(posts).then(post => {
        console.log('post from insert method:', posts);
        res.json(posts);
    }).catch(err => {
        res
        .status(500)
        .json("Error: failed to add post")
        })
    } else {
        res.status(400).json('New post needs a title and some contents. Both of them.')
    }
})

// server delete

server.delete('/api/posts/:id', (req, res) => {
    const {id} = req.params;
    db.remove(id)
    .then(count => {
        if(count) {
            res.json('post was successfully deleted')

        } else {
            res.status(404).json('invalid ID')
        }

    })
    .catch(err => {
        res.status(500).json('I could not delete that post')
    })

})



// server has to be told to listen

server.listen(PORT, () => {
    console.log(`server is alive on port ${PORT}`);
});
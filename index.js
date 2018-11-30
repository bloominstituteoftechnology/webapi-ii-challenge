// import your node modules
const express = require('express');
const db = require('./data/db.js');

const server = express();
const PORT = 3000;
const parser = express.json();
server.use(parser);
// add your server code starting here

server.get('/api/posts', (req, res) => {
    //find
    const curTime = Date();
    console.log('Get request received on :', curTime);
    db.find()
    .then((posts) => {
        res.json(posts);
    })
    .catch(() => {
        res.status(500).json({message: 'Failed to get posts'});
        console.log('Get request on :', curTime, 'failed to complete. ERR-STATUS: 500');
    })
})

server.get('/api/posts/:id', (req, res) => {
    //findById
    console.log('Get request by ID received on :', Date());
    const {id} = req.params;
    db.findById(id)
    .then((post) => {
        if(post.length) {
            res.json(post);
        }
        else {
            res.status(404).json({message: 'Post does not exist'});
        }
    })
    .catch(() => {
        res.status(500).json({message: 'Failed to get post.'});
    })
})

server.post('/api/posts', (req, res) => {
    //insert
    const postObj = req.body;
    console.log(postObj);
    if (!postObj.title) {
        res.status(400).json({message: 'Error posting data. title required'});
    }
    else if (!postObj.contents){
        res.status(400).json({message: 'Error posting data. contents required.'});
    }
    else {
        res.json({message: 'Post request received'});
    }
    
    
})

server.put('/api/posts/:id', (req, res) => {
    const {id} = req.params;
    const putObj = req.body;
    if (putObj.title && putObj.contents) {
        db.findById(id)
        .then(() => {
            db.update(id, putObj)
            .then(() => {
                db.findById(id)
                .then((post) => {
                    res.status(200).json(post);
                })
            })
            .catch(() => {
                res.status(500).json({ error: "The post information could not be modified." });
            })
        })
        .catch(() => {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        })
    }
    else {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    }
})

server.delete('/api/posts/:id', (req, res) => {
    //remove
    //db.remove()
})

server.listen(PORT, () => {
    console.log('Server started at:', Date(), 'Server is listening');
})

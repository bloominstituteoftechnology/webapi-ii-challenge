// import your node modules
const cors = require('cors');

const db = require('./data/db.js');

// add your server code starting here
const express = require("express");
const server = express();

server.use(express.json())
server.use(cors());

server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


server.listen(5000, () => 
console.log("Server is running on http://localhost:5000"));


server.get('/api/posts', (req, res) => {
    db.find()
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(error => {
        res.status(500)
        .json({message: "we failed getting posts", error: error})
    })
})

server.get('/api/posts/:id', (req, res) => {
    const {id} = req.params;
    db.findById(id)
    .then(posts => {
        if (user) {
            res.status(200).json(posts)
        } else  {
            res.status(404).json({message: "The post with the specified ID does not exist.", error: error})
        }
    })
    .catch (error => {
        res.status(500).json({message: "The post information could not be retrieved.", error: error})
    })
    
})

server.post('/api/posts', async (req,res) => {
    try {
        const postData = req.body;
        const postId = await db.insert(postData);
        res.status(201).json(postId);
    } catch(error) {
        res.status(500).json({message: "The user could not be removed"}, error)
    }
})

server.delete('/api/posts/:id', async (req,res) => {
    try {
        const {id} = req.params;
        const removeId = await db.remove(id);
        res.status(201).json(removeId);
    } catch (error) {
        res.status(500).json({message: "Post could not be removed"})
    }
})

server.put('/api/posts/:id', (req, res) => {
        const {id} = req.params;
        const content = req.body;
        if(!content.title || !content.contents) {
            res.status(400).json({errorMessage: "Please provide title and contents for the post." })
        } else {
            db.update(id, content)
            .then(count => {
                if(count) {
                    res.status(200).json({message: `${count} post changed`});
                } else {
                    res.status(404).json({message: "The post with the specified ID does not exist."})
                }
            })
            .catch(error => {
                res.status(400).json({ errorMessage: "The post information could not be modified."})
            })
        }
})

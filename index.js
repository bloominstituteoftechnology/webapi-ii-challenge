// import your node modules

const express = require("express")
const db = require('./data/db.js');

// add your server code starting here

const server = express();
const PORT = 4000; 

server.get(`/api/posts`, (req, res) => {
    db.find()
        .then((posts) => {
            res.json(posts);
        })
        .catch( err => {
            res
            .status(500)
            .json({errorMessage: "Posts Not Found" })
        })
})

server.get(`/api/posts/:id`, (req, res) => {
    const { id } = req.params;
    db.findById(id)
        .then((posts) => {
            if(post) {
            res.jason(posts.id)
            }
            else {
                res
                .status(404)
                .json({errorMessage: "Post Id Not Found"})
            }
        })
        .catch( err => {
            res
            .status(500)
            .json({errorMessage: "Post Id Not Found"})
        })
})





server.listen( PORT, ()=> {
    console.log("is this working")
})
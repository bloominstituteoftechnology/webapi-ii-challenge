// import your node modules
const express = require("express")

const db = require('./data/db.js');

// add your server code starting here
const server = express();

server.get("/", (req, res) => {
    res.send("It works, moving on")
})

server.post("/api/posts", (req, res) => {
    db.insert(req.params).then(post => {
        console.log(post)
    }).catch(err => {
        console.log(err)
    })
})


server.get("/api/posts", (req, res) => {
    db.find().then(posts => {
        res.json(posts);
    }).catch(err => {
        res.statusCode = 500;
    })
})

server.get("/api/posts/:id", (req, res) => {
    const id = req.params.id;

    db.findById(id).then(user => {
        res.json(user)
    }).catch(err => {
        res.statusCode = 500;
    })
})

server.delete("/api/posts/:id", (req, res) => {
    const id = req.params.id;

    db.remove(id).then(post => {
        console.log(post)
    }).catch(err => {
        res.statusCode = 500;
    })
})


server.listen(5000, () => console.log("listening on port 5000"));
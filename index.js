// import your node modules

const express = require("express");
const db = require("./data/db.js");

const greeter = require("./greeter.js");

const server = express();

server.get("/", (req,res) => {
    res.json("alive");
});

server.get("/greet", (req,res) => {
    res.json({ hello: "stranger" });
});

server.get("/api/users", (req, res) => {
    db.find().then(users => {
        res.json(users);
    }).catch(err => {
        res.status(500).json({ message: "We failed you, we can't get the users" });
    });
});

server.get("/api/users/:id", (req, res) => {
    const { id } = req.params;

    db.findById(id).then(user => {
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "User Not Found" });
        }
    })
    .catch(err => {
        res.status(500).json({ message: "We failed you, we ca't get the user" });
    })
});

server.get("/greet/:person", greeter);

server.get("/api/posts", (req, res) => {
    db.find().then(posts => {
        res.json(posts);
    }).catch(err => {
        res.status(500).json({ message: "We failed you, we can't get the users" });
    });
});

server.get("/api/posts/:id", (req, res) => {
    const { id } = req.params;

    db.findById(id).then(post => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: "Post Not Found" });
        }
    })
    .catch(err => {
        res.status(500).json({ message: "We failed you, we ca't get the user" });
    })
});

server.listen(9000, () => console.log("the server is alive!"));

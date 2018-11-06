// import your node modules

const express = require("express");
const db = require("./data/db.js");

const server = express();

// Middleware:
server.use(express.json()); // teaches express how to parse JSON body request

server.get("/", (req, res) => {
    res.json("alive");
});

// server.get("/api/users", (req, res) => {
//     db.find().then(users => {
//         res.json(users);
//     }).catch(err => {
//         res.status(500).json({ message: "We failed you, we can't get the users" });
//     });
// });

// server.get("/api/users/:id", (req, res) => {
//     const { id } = req.params;

//     db.findById(id).then(user => {
//         if (user) {
//             res.status(200).json(user);
//         } else {
//             res.status(404).json({ message: "User Not Found" });
//         }
//     })
//     .catch(err => {
//         res.status(500).json({ message: "We failed you, we ca't get the user" });
//     })
// });

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

server.post("/api/users", async(req, res) => {
    console.log("body: ", req.body);
    try {
        const userData = req.body;
        const userId = await db.insert(userData);
        res.status(201).json(userId);
    } catch (error) {
        res.status(500).json({ message: "error creating user", error });
    }
});

server.listen(9000, () => console.log("the server is alive!"));

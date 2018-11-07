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
        res.status(200).json(posts);
    }).catch(err => {
        res.status(500).json({ error: "The posts information could not be retrieved." });
    });
});

server.get("/api/posts/:id", (req, res) => {
    const { id } = req.params;

    db.findById(id).then(post => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        }
    })
    .catch(err => {
        res.status(500).json({ message: "The post information could not be retrieved." });
    })
});

server.post("/api/posts", (req, res) => {
    const userData = req.body;
    if (!userData.title || !userData.contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    } else {
        db.insert(userData)
            .then(feedback => {
                const post = db.findById(feedback.id);
                res.status(201).json(post);
            })
            .catch(err => {
                res.status(500).json({ error: "There was an error while saving the post to the database." });
            });
    }
});

server.delete("/api/posts/:id", (req, res) => {
    const id = req.params.id;
    const post = db.findById(id);
    db.remove(req.params.id)
        .then(count => {
            if (count) {
                res.status(200).json(post);
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
    })
    .catch(err => {
        res.status(500).json({ error: "The post could not be removed" });
    });
});

server.put("/api/posts/:id", (req, res) => {
  const userData = req.body;
  db.update(req.params.id, userData)
    .then(count => {
      if (count) {
        res.status(200).json({ message: `${count} users updated` });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "error editing user info" });
    });
});

server.listen(9000, () => console.log("the server is alive!"));

// import your node modules

const express = require("express");
const cors = require("cors");
const db = require("./data/db.js");
const port = 5000;
const server = express();

server.use(express.json());
server.use(cors());

server.listen(port, () => console.log(`Server is running on port ${port}.`));

// add your server code starting here

server.get("/", (req, res) => {
    res.json("Root Directory");
});

server.post('/api/posts/', (req, res) => {
    const { title, contents } = req.body;

    if (!title || !contents) {
        res.status(400);
        res.json({ errorMessage: "Please provide title and contents for the post." });
        return;
    }

    db.insert({ title, contents })
        .then(insert_response => {
            res.status(201);
            db.findById(insert_response.id)
                .then(findById_response => {
                    if (findById_response.length === 0) {
                        res.status(404);
                        res.json({ message: "The post with the specified ID does not exist." });
                    }
                    else {
                        res.json(findById_response[0]);
                    }
                })
                .catch(error => {
                    res.status(500);
                    res.json({ error: "The post information could not be retrieved." });
                })
        })
        .catch(error => {
            res.status(500);
            res.json({ error: "There was an error while saving the post to the database." });
        })
})

server.get('/api/posts/', (req, res) => {
    db.find()
        .then(find_response => {
            res.json(find_response);
        })
        .catch(error => {
            res.status(500);
            res.json({ error: "The posts information could not be retrieved." });
        })
})

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;

    db.findById(id)
        .then(findById_response => {
            if (findById_response.length === 0) {
                res.status(404);
                res.json({ message: "The post with the specified ID does not exist." })
            }
            else {
                res.json(findById_response[0]);
            }
        })
        .catch(error => {
            res.status(500);
            res.json({ error: "The post information could not be retrieved." });
        })
})

server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    let deleted_post = {}

    db.findById(id)
        .then(findById_response => {
            if (findById_response.length === 0) {
                res.status(404);
                res.json({ message: "The post with the specified ID does not exist." });
            }
            else {
                deleted_post = findById_response[0];
            }
        })
        .catch(error => {
            res.status(500);
            res.json({ error: "The post information could not be retrieved." });
        })

    db.remove(id)
        .then(remove_response => {
            if (remove_response === 0) {
                res.status(404);
                res.json({ message: "The post with the specified ID does not exist." });
            }
            else {
                res.json(deleted_post);
            }
        })
        .catch(error => {
            res.status(500);
            res.json({ error: "The post could not be removed." });
        })
})

server.put('/api/posts/:id', (req, res) => {
    const { id } = req.params;

    const { title, contents } = req.body;

    if (!title || !contents) {
        res.status(404);
        res.json({ errorMessage: "Please provide title and contents for the post" });
    }

    db.update(id, { title, contents })
        .then(update_response => {
            if (update_response === 0) {
                res.status(404);
                res.json({ message: "The post with the specified ID does not exist." });
            }
            else {
                res.status(200);
                db.findById(id)
                    .then(findById_response => {
                        if (findById_response.length === 0) {
                            res.status(404);
                            res.json({ message: "The post with the specified ID does not exist." });
                        }
                        else {
                            res.json(findById_response[0]);
                        }
                    })
                    .catch(err => {
                        res.status(500);
                        res.json({ error: "The post information could not be retrieved." });
                    })
            }
        })
        .catch(error => {
            res.status(500);
            res.json({ error: "The post information could not be modified." });
        })
})




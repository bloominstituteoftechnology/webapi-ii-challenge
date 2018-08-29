// import your node modules
const express = require('express');

const db = require('./data/db.js');

// add your server code starting here
const server = express();
server.use(express.json());

server.get('/', (req, res) =>{
    res.send('Hello CS12')
})

server.get('/posts', (req, res) => {
    db.find()
    .then(posts =>{
        res.status(200).json(posts)
    })
    .catch(err=>{
        console.error('error', err);
        res.status(500).json({ message: 'Error getting the data'})
    })
})

server.get("/posts/:id", (req, res) => {
    const id = req.params.id;
    db.findById(id)
        .then(post => {
            if (post.length > 0) {
                res.status(200).json(post);
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
        })
        .catch(err => {
                res.status(500).json({ error: "The post information could not be retrieved." });
        });
});

server.post("/posts", (req, res) => {
    const data = req.body;
    if (data.title && data.contents) {
        db.insert(data)
            .then(response =>
                db.findById(response.id).then(post => {
                    res.status(201).json(post);
            })
            )
            .catch(err => {
                res.status(500).json({ error: "There was an error while saving the post to the database"});
            });
    } else {
        res
            .status(400).json({ errorMessage: "Please provide title and contents for the post."});
    }
});

server.delete("/posts/:id", (req, res) => {
    const id = req.params.id;
        db.remove(id)
            .then(count => {
                if (count) {
                    res.status(200).json({ message: "Successfully deleted post" });
                } else {
                    res.status(404).json({ error: "The post with the specified ID does not exist" });
                }
            })
            .catch(err => {
                res.status(500).json({ error: "There was an error removing the post" });
            });
});

server.put("/posts/:id", (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
        if (updatedData.title && updatedData.contents) {
        db.update(id, updatedData)
            .then(response => {
            if (response > 0) {
                db.findById(id).then(post => {
                res.status(200).json(post);
                });
            } else {
                res
                .status(404)
                .json({ message: "The post with the specified ID does not exist" });
            }
            })
            .catch(err => {
            res
                .status(500)
                .json({ error: "The post information could not be modified" });
            });
        } else {
        res
            .status(400)
            .json({ message: "Please provide title and contents for the post" });
        }
});

server.listen(5000, () =>     
    console.log(`server is listening on port 5000`));

// import your node modules
const express = require('express');
const cors = require('cors');

const db = require('./data/db.js');

// add your server code starting here
const server = express();

server.use(cors());
server.use(express.json());

server.get('/api/posts', (req, res) => {
    db
    .find()
    .then(pts => {
        res.status(200).json(pts);
    })
    .catch(err => {
        res.status(500).send({ error: "The posts information could not be retrieved." });
    });
});

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db
    .findById(id)
    .then(pstidv => {
        if (!pstidv) {
            return res.status(404).send({ message: "The post with the specified ID does not exist." });
        }
        res.status(200).json(pstidv);
    })
    .catch(err => {
        res.status(500).send({ error: "The post information could not be retrieved." });
    });
});

server.post('/api/posts', (req, res) => {
    const { title, contents } = req.body;
    const nwPst = { title, contents };
    db
    .insert(nwPst)
    .then(pstidf => {
        const { id } = pstidf;
        db
        .findById(id)
        .then(pstidv => {
            console.log(pstidv);
            if (!title || !contents) {
                return res.status(400).send({ errorMessage: "Please provide title and contents for the post." });
            }
            res.status(201).json(pstidv)
        });
    })
    .catch(err => {
        res.status(500).send({ error: "There was an error while saving the post to the database" });
    });
});

server.put('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const { title, contents } = req.body;
    const nwPst = { title, contents };
    console.log(nwPst);
    db
    .update(id, nwPst)
    .then(pstidv => {
        console.log(pstidv);
        if (!pstidv) {
            return res.status(404).send({ message: "The post with the specified ID does not exist." });
        }
        if (!title || !contents) {
            return res.status(400).send({ errorMessage: "Please provide title and contents for the post." });
        }
        res.status(200).json(pstidv);
    })
    .catch(err => {
        res.status(500).send({ error: "The post information could not be modified." });
    });
});

server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db
    .remove(id)
    .then(pstrmv => {
        console.log(pstrmv);
        if (!pstrmv) {
            return res.status(404).send({ message: "The post with the specified ID does not exist." });
        }
        res.status(200).json(pstrmv);
    })
    .catch(err => {
        res.status(500).send({ error: "The post could not be removed" });
    });
});

const port = 5000;
server.listen(port, () => console.log(`API running on port ${port}`));

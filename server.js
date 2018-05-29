// import your node modules
const express = require('express');
const bodyParser = require('body-parser');
// const CORS = require('cors');

const port = 5000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(CORS());

const db = require('./data/db.js');

// add your server code starting here
app.get('/api/posts', (_, res) => {
    db.find()
    .then(dbRes => {
        // return res
        res.status(200).json(dbRes)
    })
    .catch(error => {
        res.status(500).json({ errorMessage: "The posts information could not be retrieved." })
    })
});

app.get('/api/posts/:id', (req, res) => {
    const { id } = req.params
    db.findById(id)
    .then(dbRes => {
        // response from db
        if (dbRes.length > 0) {
            res.status(200).send(dbRes)
        } else{
            res.status(404).json({ errorMessage: "The post with the specified ID does not exist." })
        }
    })
    .catch(error => {
        res.status(500).json({ errorMessage: "The posts information could not be retrieved." })
    })
});

app.post('/api/posts', (req, res) => {
    const  { title, contents } = req.body
    if (title && contents) {
        // insert to db
        const obj = db.insert({ title, contents })
        .then(dbRes => {
            // return res
            res.status(201).json({ id: dbRes.id, title, contents })
        })
        .catch(error => {
            res.status(500).json({ errorMessage: error })
        })
    } else {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    }
});

app.delete('/api/posts/:id', (req, res) => {
    const  { id } = req.params
    db.remove(id)
    .then(dbRes => {
        // response from db
        if (dbRes != 0) {
            res.status(200).json({ response: "Deleted"})
        } else{
            res.status(404).json({ errorMessage: "The post with the specified ID does not exist." })
        }
    })
    .catch(error => {
        res.status(500).json({ errorMessage: "The post could not be removed" })
    })
});

app.put('/api/posts/:id', (req, res) => {
    const { id } = req.params
    const { title, contents } = req.body
    if (title && contents) {
        // insert to db
        const obj = db.update(id, { title, contents })
        .then(dbRes => {
            // return res
            const updatedPost = db.findById(id)
            .then(updatedPost => {
                res.status(200).json(updatedPost)
            })
            .catch(error => {
                res.status.json({ errorMessage: "The post is updated but cannot retrieve. Try reloading."})
            })
        })
        .catch(error => {
            res.status(500).json({ errorMessage: "The post information could not be modified." })
        })
    } else {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    }
});

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
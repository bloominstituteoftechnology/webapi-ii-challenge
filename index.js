/*import db from './data/db.js';
import express from 'express';
import bodyParser from 'body-parser';*/
let db = require('./data/db.js');
let express = require('express');
let bodyParser = require('body-parser');

const app = express();

app
    .use(bodyParser.json())

    .post('/api/posts', function (req, res) {
        const {title, contents} = req.body;

        if (!title || !contents) return res.status(400).json({errorMessage: "Please provide title and contents for the post."});

        db.insert(req.body).then(posts => res.status(201).json(posts)).catch(err => res.status(500).json({error: "There was an error while saving the post to the database"}))
    })

    .get('/api/posts', function (req, res) {
        db.find().then(posts => res.json(posts)).catch(err => res.status(500).json({error: "The posts information could not be retrieved."}))
    })

    .get('/api/posts/:id', function (req, res) {
        db.findById(req.params.id).then(post => {
            if (!post) return res.status(404).json({message: "The post with the specified ID does not exist."});
            res.json(posts)
        }).catch(err => res.status(500).json({error: "The post information could not be retrieved."}))
    })

    .delete('/api/posts/:id', function (req, res) {
        db.remove(req.params.id).then(post => {
            if (!post) return res.status(404).json({message: "The post with the specified ID does not exist."});
            res.json(post)
        }).catch(err => res.status(500).json({error: "The post could not be removed"}))
    })

    .put('/api/posts/:id', function (req, res) {
        const {title, contents} = req.body;

        if (!title || !contents) return res.status(400).json({errorMessage: "Please provide title and contents for the post."});

        db.update(req.params.id, req.body).then(post => {
            if (!post) return res.status(404).json({message: "The post with the specified ID does not exist."});
            res.json(post)
        }).catch(err => res.status(500).json({error: "The post information could not be modified."}))
    });

app.listen(5000);
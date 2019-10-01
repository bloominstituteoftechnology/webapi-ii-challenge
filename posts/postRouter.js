const express = require('express');
const DateBase = require('../data/db.js');

const router = express.Router();

router.get('/', (req,res) => {
    DateBase.find()
    .then(posts => res.status(200).json(posts))
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: "The posts information could not be retrieved"})
    })
});


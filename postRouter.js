const express = require('express');
const db = require('./data/db.js');

const router = express.Router();

router.get('/', (req, res) => {
    db.find()
        .then(posts => res.status(200).json(posts))
        .catch(err => {
            console.log(err);
            res.status(500).json()
        })
})

module.exports = router;
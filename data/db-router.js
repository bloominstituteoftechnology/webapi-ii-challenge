//imports:
const express = require('express');
const BPosts = require('./db.js');

//Router() --> express! 
const router = express.Router();

//endpoints

router.get('/', (req, res) => {
    BPosts.find(req.query)
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(error => {
            res.status(500).json({ errorMessage: "Please provide title and contents for the post." });
        })
})








//export:
module.exports = router;
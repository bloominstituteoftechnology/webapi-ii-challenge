const express = require('express');

const db = require('../data/db');

const router = express.Router();

//GET

router.get('/', (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json({ success: true, posts });
    })
    .catch(error => {
      res.status(500).json({ success: false, error: "The posts information could not be retrieved"})
    })
});


module.exports = router;
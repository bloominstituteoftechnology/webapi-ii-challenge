const router = require("express").Router();

const db = require('../data/db');

router.get('/', (req, res) => {
    db.find()
        .then((data) => res.status(200).json(data))
        .catch(err => res.status(500).json({ error: "The posts information could not be retrieved." }))
});

router.post('/', (req, res) => {
    const post = req.body;


});

module.exports = router;
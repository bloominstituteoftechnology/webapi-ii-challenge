const router = require('express').Router();

const db = require('./data/db');

router.get('/', (req, res) => {
    db.find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            console.log('\n=== ERROR ===\n', error);
            res.status(500).json({ error: "The posts information could not be retrieved." })
        })
})

module.exports = router;
const express = require('express');
const db = require('./data/db');

const router = express.Router();

router.get('/', async(req, res) => {
    try{
        const users = await db.find(req.query);
        res.status(200).json(users)
    } catch(err) {
        res.status(500).json({error: "The posts information could not be retrieved."})
    }
})


module.exports = router;
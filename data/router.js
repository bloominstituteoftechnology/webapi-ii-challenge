const server = require('../server');
const express = require('express')
const db = require('./db')
const router = express.Router()

const noNotes = `No notes for you`;

router.get('/', (req, res) => {
	db.find().then(posts => res.status(200).json(posts));
})



module.exports = router;
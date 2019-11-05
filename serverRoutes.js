const express = require('express');
const router = express.Router(); 
const data = require('./data/db.js');


//Creates a post using the information sent inside the request body.
router.post('/', (req, res) => {
   res.status(200).send('hello from the POST /users endpoint');
 });

// 	Creates a comment for the post with the specified id using information sent inside of the request body.
router.post('/', (req, res) => {
   res.status(200).send('hello from the POST /users endpoint');
 });

// Returns an array of all the post objects contained in the database.
router.get('/', (req, res) => {
   res.status(200).send('hello from the GET /users endpoint');
 });

// 	Returns the post object with the specified id.
router.get('/:id', (req, res) => {
   res.status(200).send('hello from the GET /users/:id endpoint');
 });


// Returns an array of all the comment objects associated with the post with the specified id.
//code here.


// Removes the post with the specified id and returns the deleted post object. You may need to make additional calls to the database in order to satisfy this requirement.
//code here.


// Updates the post with the specified id using data from the request body. Returns the modified document, NOT the original.
//code here.



module.exports = router; 
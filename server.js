// import your node modules
const express = require('express');
const db = require('./data/db');

const server = express();

server.listen(5000, () => console.log('\n==API running on port 5000 ==\n'));
// add your server code starting here


// When the client makes a POST request to /api/posts:

// If the request body is missing the title or contents property:
// -. cancel the request.
// -. respond with HTTP status code 400 (Bad Request).
// -. return the following JSON response: { errorMessage: "Please provide title and contents for the post." }.

// If the information about the post is valid:
// -. save the new post the the database.
// -. return HTTP status code 201 (Created).
// -. return the newly created post.

// If there's an error while saving the post:
// -. cancel the request.
// -. respond with HTTP status code 500 (Server Error).
// -. return the following JSON object: { error: "There was an error while saving the post to the database" }.

server.post('api/posts', (req, res) => {
    const ob = req.body;
    db
        .insert(ob)
        .then(response => {
            if (typeof req.body.title !== 'undefined' || typeof req.body.contents !== 'undefined') {
                res.status(400).json({ message: 'Please provide title and contents for the post.'});
            }
         else {
            res.status(201).json({ messege: 'Post Successful.' });
        }})
        .catch(err => {
            res.status(500).json({ message: 'here was an error while saving the post to the database'});
        });

});

// When the client makes a GET request to /api/posts:

// If there's an error in retrieving the posts from the database:
// -. cancel the request.
// -. respond with HTTP status code 500.
// -. return the following JSON object: { error: "The posts information could not be retrieved." }.

// server.get('api/posts', (req, res) => {
//     db
//         .find()
//         .then(users => {
//             res.json(users);
//         })
//         .catch(err => {
//           res.status(500).json({ error: "The posts information could not be retrieved." });
//         });
// });


//.get --> findbyid
server.get('/api/posts', (req, res) => {
    db.find().then(posts => {
        res.json(posts);
    })
    .catch(err => {
        res.status(500).json({error: 'could not retrieve post information'});
    })
})



// When the client makes a GET request to /api/posts/:id:

// If the post with the specified id is not found:
// -. return HTTP status code 404 (Not Found).
// -. return the following JSON object: { message: "The post with the specified ID does not exist." }.

// If there's an error in retrieving the post from the database:
// -. cancel the request.
// -. respond with HTTP status code 500.
// -. return the following JSON object: { error: "The post information could not be retrieved." }.

server.get('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    db
    .findById(id)
    .then(post => {
        if (post.length === 0) {
            res.status(404).json({ message: 'The post with the specified ID does not exist.'})
        } else {
            res.json(post);
        }
    })
    .catch(err => {
        res.status(500).json({error: 'The post information could not be retrieved.'});
    });
});

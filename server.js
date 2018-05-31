// import your node modules.
const express = require('express');
const cors = require('cors');
const db = require('./data/db');
const port = 5001;

const server = express();
server.use(express.json());

// 1st arg: route where a resource can be interacted with
// 2nd arg: callback to deal with sending responses, and handling incoming data
// Returns an array of all the post objects contained in the database.
server.get('/api/posts', (req, res) => {
     db
        .find()
        .then(posts => {
            res.json({ posts });
        })
        .catch(error => {
            res.status(500).json({ errorMessage: error});
         
        })
});

//Creates a post using the information sent inside the request body.
server.post('/api/posts', (req, res) => {
    const { title, contents } = req.body;
    db
    .insert({ title, contents })
        .then(response => {
            console.log(response);
            res.status(201).send(response) //201 === created
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({errorMessage: 'There was an error while saving the user to the database'});
        })
    });

//Returns the post object with the specified id. 
server.get('/api/posts/:id', (req, res) => {
    // const id = req.params.id; //ES5
    const { id } = req.params; //ES6 Deconstruction 
    console.log('Params:', id);
    db
    .findById(id)
        .then(post => {
            res.json(post);
        })
        .catch(error => {
            res.status(500).json({errorMessage: error});
        })
});

// Removes the post with the specified id and returns the deleted post.
server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db
    .remove(id)
        .then(response => {
            if (response === 0 ) {
                res.status(500).json({errorMessage: 'User with specified ID does not exisit.'});
            } 
            res.json({message: 'User with id ${id} has been removed from the system.'});
        })
        .catch(error => {
            res.status(500).json({errorMessage: 'The user could not be removed.'});
        })
});

// Updates the post with the specified id using data from the request body. Returns the modified document, NOT the original.
server.put(`/api/posts/:id`, (req, res) => {
    const { id } = req.params;
    const { title, contents } = req.body;
    // update: accepts two arguments, the first is the id of the user to update and the second is an object with the changes to apply. It returns the count of updated records. If the count is 1 it means the record was updated correctly.
    db.update(id, { title, contents })
        .then(count => {
            if (count > 0) {
                res.status(200).json({message: 'Updated Successfully'})
            } else {
                res.status(404).json({messageError: 'The user with the specified ID does not exist'})
            }
        }).catch(err => {
            res.status(500).json({messageError: 'The user information could not be modified.'});
        })
})


// server.put('api/posts/:id', (req, res) => {
//     const { id } = req.params; 
//     const { title, contents } = req.body;

//     if (!title || !contents) {
//         res.status(400).json({errorMessage: 'Must provide title and content.'});
//         // return;
//     }
//     db
//     .update(id, { title, contents })
//     .then(response => {
//         if(response == 0) {
//             res.status(404).json({errorMessage: 'The post with the specified Id does not exist.'});
//             // return;
//         }
//         db
//         .findById(id)
//         .then(post => {
//             if(post.length === 0) {
//                 res.status(404).json({errorMessage: 'Post with that Id not found.'})
//                 // return;
//             }
//             res.json(post);
//         })
//         .catch(error => {
//             res.status(500).json({errorMessage: 'Error looking up post.'})
//         })
//     })
//     .catch(error => {
//         req.status(500).json({errorMessage: 'Something bad happened in the database'});
//         // return;
//     })
// })

// add your server code starting here
server.listen(port, () => console.log('Server is running on port ${port}'));


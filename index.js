// import your node modules
const express = require('express');

const db = require('./data/db.js');

// add your server code starting here

const server = express();

server.get('/api/posts', (req, res) => {
    db.find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            res.status(500).json({ message: 'Sorry'})
        });
   
});

server.get('/api/posts/:id', (req, res) => {
    const id = req.params;
    db.findById(id)
        .then(post => {
            console.log('post',post);
            res.status(200).json(post);
        })
        .catch(err => {
            res.status(500).json({message: `Couldn't find post ${id}`});
        });
});

server.listen(8000, () => console.log('API running on port 8000'));




// server.get("/api/users", (req, res) => {
//     db.find()
//         .then(users => {
//             res.status(200).json(users);
//         })
//         .catch(err => {
//             res
//                 .status(500)
//                 .json({ message: "Sorry"})
//         })
// })

// import your node modules
const express = require('express');
const db = require('./data/db.js');
const cors = require('cors');



// add your server code starting here
const port = 5050;
const server = express();
server.use(express.json());
server.use(cors());

const userError = (status, message, res) => {
    res.status(status).json({ errorMessage: message })
}

server.get('/', (req, res) => {
    res.send('node-express-lab')
});

server.get('/api/posts', (req, res) => {
    db
        .find()
        .then(posts => {
            res.json({ posts })
        })
        .catch(error => {
            userError(500, 'The posts information could not be retrieved.', res);
        });
});

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db
        .findById(id)
        .then(posts => {
            if (post.length === 0) {
                userError(404, "The post with the specified ID does not exist.", res);
                return;
            }
            res.send(posts);
        })

        .catch(error => {
            userError(500, "The post information could not be retrieved.", res);
        });
});

server.post('/api/posts', (req, res) => {
    const { title, contents } = req.body;

    if (!title || !contents) {
        userError(400, 'Please provide title and contents for the post.', res)
        return;
    }
    db
        .insert({ title, contents })
        .then(response => {
            res.status(201).send(response);
        })
        .catch(error => {
            userError(500, "There was an error while saving the post to the database", res)
        })
})

// server.delete('/api/posts/:id', (req, res) => {
//     db    
//         .remove(req.params.id)
//         .then(response => {
//             if (response === 0) { 
//                 userError(404, "The post with the specified ID does not exist.", res);
//             } else { 
//                 res.status(200).json(response) 
//                 }
//         })
//         .catch(error => {
//             userError(500, "the post could not be removed", res)
//         });
// Not sure why this isn't working and giving me error. Lost a good 20 mins figuring it out.

server.delete('/api/posts/:id', (req, res) => {
    db
        .remove(req.params.id)
        .then(response => {
            if (response === 0) {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            } else {
                res.status(200).json(response);
            }
        })
        .catch(error => {
            res.status(500).json({ error: "The post could not be removed" });
        })
});


server.listen(port, () => console.log(`Server running on port ${port}`));
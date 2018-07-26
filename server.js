// import your node modules
const express = require('express');
const db = require('./data/db.js');

// add your server code starting here
const port = 8333;
const server = express();
server.use(express.json());

const sendUserError = (status, message, res) => {
    res.status(status).json({errorMessage: message});
    return;
}

// DATA SHAPE
// {
//     posts: [
//         {
//             id: 1,
//             title: "I wish the ring had ...",
//             contents: "Guess who said this",
//             created_at: "2018-04-02 19:01:55",
//             updated_at: "2018-04-02 19:01:55"
//         }
//     ]
// }
// GET ALL POSTS
server.get('/api/posts', (req, res) => {
    //const { post } = req.body;
    console.log(req.body);

    db
        .find()
        .then(posts => {
            res.json( {posts} )
        })
        .catch(error => {
            console.log(error);
            sendUserError(500, "The posts information could not be retrieved.", res);
            return;
        })

})
//GET POST BY ID
server.get('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    db
        .findById(id)
        .then(post => {
            if (post.length === 0) {
                sendUserError(404, "The post with the specified ID does not exist.", res);
                return;
            } else {
                res.json({ post })
            }
        })
        .catch(error => {
            console.log(error);
            sendUserError(500, "The post information could not be retrieved.", res);
            return;
        })
})
//POST / CREATE new post
server.post('/api/posts', (req, res) => {
    const { title, contents } = req.body;
    if (!title || !contents) {
        sendUserError(400, "Please provide title and contents for the post.", res);
        return;
    }
    db
        .insert({ title, contents })
        .then(response => {
            res.status(201).json({"successNewId" : response});
        })
        .catch(error => {
            console.log(error);
            sendUserError(500, "There was an error while saving the post to the database", res);
            return;
        })        
})

server.listen(port, () => console.log(`Server is running on port ${port}`));


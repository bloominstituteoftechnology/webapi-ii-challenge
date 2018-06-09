// import your node modules
const express = require('express');
const cors = require('cors'); 
const db = require('./data/db.js');

// add your server code starting here
const port = 5555;
const server = express();
server.use(express.json())
server.use(cors({ origin: 'http://localhost:3000' }))

const sendUserError = (status, message, res) => {
    res.status(status).json({ errorMessage: message });
    return;
  };
  
const searchMiddleware = (req, res, next) => {
    db.find().then(posts => {
        req.posts = posts;
        next();
    }).catch(err => {
        sendUserError(500, "Something bad happened", res)
    })
}
server.get('/', searchMiddleware, (req, res) => {
    console.log(req.query)
    console.log(req.posts)
    res.send('Please work, thanks')
});


server.post('/api/posts', (req, res) => {
    const { title, contents } = req.body;
    if (!title || !contents) {
        sendUserError(400, "Please provide title and contents for the post", res)
    } else {
        db
            .insert({ title, contents })
            .then(response => {
                res.status(201);
                db
                    .findById(response.id)
                    .then(post => {
                        res.json({ post })
                    });
            })
            .catch(error => {
                sendUserError(500, "There was an error while saving the post to the database.", res)
            })
}})

server.get('/api/posts', (req, res) => {
    db
        .find()
        .then(posts => {
            res.json({ posts });
        })
        .catch(error => {
            sendUserError(500, "The posts information could not be retrieved", res)
        });
})

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params
    db 
        .findById(id)
        .then(posts => {
            if (posts.length > 0) {
                res.json({ posts })
            } else {
                sendUserError(404, "The post with the specified ID does not exist.", res)
            }
        })
        .catch(error => {
            sendUserError(500, "The post information could not be retrieved.", res)
        });
})

server.put('/api/posts/:id', (req, res) => {
    const { id } = req.params
    const { title, contents } = req.body
    db
        .update(id, { title, contents })
        .then(posts => {
            if (!title || !contents) {
                sendUserError(400, "Please provide title and contents for the post.", res)
            } else if (posts === 0) {
                sendUserError(404, "The post with the specified ID does not exist.", res)
            } else {
                db
                    .findById(id)
                    .then(posts => {
                        res.json({ posts })
                    });
            }})
            .catch(error => {
                sendUserError(500, "The post information could not be modified.", res)
            })
});
server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    let deletedPost;
    db 
        .findById(id)
        .then((post) => deletedPost = post)
    db 
        .remove(id)
        .then(posts => {
            if (posts === 0) {
                sendUserError(404, "The post with the specified ID does not exist.", res)
            } else {
                res.json({ deletedPost });
            }})
            .catch(error => {
                sendUserError(500, "The post could not be removed.", res)
            })
});

server.listen(port, () => console.log(`Server running on port ${port}`));
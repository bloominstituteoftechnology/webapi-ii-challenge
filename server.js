const express = require('express'); //import express;
const dataB = require('./data/db.js');
const server = express();

server.use(express.json()); //middleware -- express to parse JSON body

server.get('/', (req, res) => {
    res.status(200).json({ api: 'up....' });
});


// //-*-*-*-* GET REQUEST  -*-*-*-*
server.get('/api/posts', (req, res) => {
    dataB
        .find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch();
})

server.get('/api/comments', (req, res) => {
    dataB.findPostComments()
        .then(comments => {
            res.status(200).json(comments);
        })

});


// //-*-*-*-* POST REQUEST  -*-*-*-*

server.post('/api/posts', (req, res) => {
    const post = req.body;
    const { title, contents } = req.body;

    if (title && contents) {
        dataB.insert(post).then(id => {
            dataB
                .findById(id.id)
                .then(postObj => {
                    res.status(200).json(postObj);
                })
                .catch(err =>
                    res.status(500).json({
                        error:
                            'There was an error while saving the user to the database',
                    })
                )
                .catch(err =>
                    res.status(500).json({
                        error:
                            'There was an error while saving the user to the database',
                    })
                );
        });
    } else {
        res.status(400).json({
            errorMessage: 'Please provide name and bio for the user.',
        }); //Bad Request
    }
});

// //-*-*-*-* GET REQUEST  -*-*-*-*

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;

    dataB
        .findById(id)
        .then(response => {
            if (response.length > 0) {
                res.status(200).json(response)
            } else {
                res.status(404).json({
                    message: 'The post with the specified ID does not exist.',
                }) //Bad Request
            }
        })
        .catch(err =>
            res.status(500).json({
                error: 'The post information could not be retrieved.',
            })
        )
});

//the comments in specific post with specific id
server.get('/api/posts/:postId/comments', (req, res) => {
    const { postId } = req.params;

    dataB
        .findPostComments(postId)
        .then(response => {
            if (response.length > 0) {
                res.status(200).json(response)
            } else {
                res.status(404).json({
                    message: 'The post with the specified ID does not exist. ',
                }) //Bad Request
            }
        })
        .catch(err =>
            res.status(500).json({
                error: 'The comments information could not be retrieved. ',
            })
        )
});

//Export
module.exports = server;

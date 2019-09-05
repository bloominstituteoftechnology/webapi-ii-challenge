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
        .catch(err => {
            console.log(err);
            res.status(500)
                .json({ error: "The posts information could not be retrieved." })
        });
})

server.get('/api/comments/:post_id', (req, res) => {
    const { post_id } = req.params;
    const { test } = req.body;

    dataB
        .findById(post_id)
        .then(response => {
            if (response.length > 0) {
                res.status(200).json(response)
            } else {
                res.status(404).json({
                    message: 'The post with the specified ID does not exist. COMMENT ID',
                }) //Bad Request
            }
        })
        .catch(err =>
            res.status(500).json({
                error: 'The post information could not be retrieved. COMMENT ID',
            })
        )
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

//supposed to allow me to add comments to a specific post
server.post('/api/posts/:post_id/comments', (req, res) => {
    const { post_id } = req.params;
    const { text } = req.body;

    if (text === '') {
        return res.status(400).json({
            errorMessage: "Please provide text for the comment."
        });
    }


    dataB
        .insertComment({ text, post_id })
        .then(commentResponseId => {
            dataB.findCommentById(commentResponseId)
                .then(([comment]) => {
                    res.status(200).json(comment)
                    // if comment exists
                    if (comment) {
                        res.status(200).json(comment);
                    } else {
                        res.status(404).json({ message: "The post with the specified ID does not exist." })
                    }
                })
                .catch(err => {
                    console.log('post comment get', err);
                    res.status(500).json({
                        error: 'The comments information could not be retrieved. ',
                    })

                })
            res.status(200).json(commentResponseId)
        })
        .catch(err => {
            console.log('err', err);
            res.status(500).json({

                error: 'The comments information could not be retrieved. ',
            })
        }
        )
    // dataB
    //     .insertComment({ text, post_id })
    //     .then(responseId => {

    //         res.status(200).json(responseId)
    //     })
    //     .catch(err => {
    //         console.log('err', err);
    //         res.status(500).json({

    //             error: 'The comments information could not be retrieved. ',
    //         })
    //     }
    //     )
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


// //-*-*-*-* DELETE REQUEST  -*-*-*-*

server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;

    dataB
        .remove(id)
        .then(deleted => {
            console.log('deleted', deleted);
            if (deleted) {
                res.status(204).json(deleted);
            } //200 means good
            else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: 'The post could not be removed',
            });
        });
});

//-*-*-*-* UPDATE REQUEST  -*-*-*-*
server.put('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const { title, contents } = req.body;

    if (!title && !contents) {
        return res.status(404).json({ message: "The post with the specified ID does not exist." })
    }

    dataB
        .update(id, { title, contents })
        .then(updated => {
            if (updated) {
                console.log('Updated', updated);
                dataB.findById(id)
                    .then(post => res.status(200).json(post))
                    .catch(err => {
                        console.log('err', err);
                        res.status(500).json({
                            error: "The post information could not be modified!!!!"
                        }) //Bad Request
                    })
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                }) //Bad Request
            }
        })
        .catch(err =>
            res.status(500).json({
                error: 'The post information could not be modified.',
            })
        )
});


//Export
module.exports = server;

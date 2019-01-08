// import your node modules
const db = require('./data/db.js');
const express = require('express');

// add your server code starting here
const server = express();
// .json() comes default with express
server.use(express.json());

// gets all posts
server.get('/api/posts', (req, res) => {

	db.find()
		.then(posts => {
			res.status(200).json({ posts });
		})
		.catch(() => {
			res.status(500).json({
				error: 'The posts information could not be retrieved.',
			});
        });
        
});

// gets one post by ID
server.get('/api/posts/:id', (req, res) => {

	db.findById(req.params.id)
		.then(post => {
			if (post.length) {
				res.status(200).json(post);
			} else {
				res.status(404).json({
					message: 'The post with the specified ID does not exist.',
				});
			}
		})
		.catch(err => {
			res.status(500).json({
                message: 'The post information could not be retrieved.',
                error: err
			});
        });
        
});

// adds new post
server.post('/api/posts', (req, res) => {
    
    const post = req.body;
    
    if (post.title && post.contents) {
        db.insert(post)
            .then(response => {
                db.findById(response.id)
                    .then(newPost => {
                        res.status(201).json(newPost);
                    })
            })
            .catch(err =>
                res.status(500).json({
                    message: 'There was an error while saving the post to the database',
                    error: err
                })
            );
    } else {
        res.status(500).json({
            message: 'Please provide title and contents for the post.'
        })
    }

});

// deletes post by ID
server.delete('/api/posts/:id', (req, res) => {

    const { id } = req.params;

    db.findById(id)
        .then(post => {
            if (post.length) {
                db.remove(id).then(() => {
                    res.status(200).json(post);
                })
            } else {
                res
                    .status(404)
                    .json({
                        message: 'The post with the specified ID does not exist.'
                    })
            }
        })
        .catch(err => res.status(500).json({
            message: 'The post could not be removed.',
            error: err
        }));

});

// modifies post by ID
server.put('/api/posts/:id', (req, res) => {

    const { id } = req.params;
    const { body } = req;

    if (body.title && body.contents) {
        db.findById(id)
            .then(post => {
                if (post.length) {
                    db.update(id, body)
                        .then(count => {
                            if (count === 1) {
                                db.findById(id)
                                    .then(updatedPost => {
                                        res.status(200).json(updatedPost)
                                    })
                            } else {
                                res.status(500).json({
                                    message: 'Something went wrong with modifying the post.'
                                })
                            }
                        })
                } else {
                    res.status(404).json({
                        message: 'The post with the specified ID does not exist.'
                    })
                }
            })
            .catch(err => res.status(500).json({
                message: 'The post information could not be modified.',
                error: err
            }))
    } else {
        res.status(400).json({
            message: 'Please provide title and contents for the post.'
        })
    }

    // omg this is crazy ^

});

// creates server that listens to port 5000
server.listen(5000, () => console.log('server running'));

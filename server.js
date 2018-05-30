const express = require('express');
const db = require('./data/db.js');

const port = 5000;
const server = express();
server.use(express.json());

const sendUserError = (status, message, res) => {
    res.status(status).json({ errorMessage: message });
    return;
}


server.post('/api/posts', (req, res) => {
    const { title, contents } = req.body;
    if (!title || !contents) {
        sendUserError(400, 'Please provide title and contents for the post.', res);
        return;
    }
    db
        .insert({
            title,
            contents
        })
        .then(response => {
            res.status(201).json(response);
        })
        .catch(error => {
            sendUserError(500, `There was an error while saving the post to the database`, res)
        });  
});

server.get('/api/posts', (req, res) => {
    db
        .find()
        .then(posts => {
            res.json({posts});
        })
        .catch(error => {
            sendUserError(500, `The posts information could not be retrieved.`, res);
        });
})

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db
        .findById(id)
        .then(post => {
            if(post.length === 0) {
                sendUserError(404, `The post with the specified ID does not exist.`, res);
                return;
            }
            res.json({post});
        })
        .catch(error => {
            sendUserError(500, `The post information could not be retrieved.`, res);
        });
});

server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db
        .remove(id)
        .then(response => {
            if(response === 0) {
                sendUserError(404, `The post with the specified ID does not exist.`, res);
                return;
            }
            res.json({ success: `The post with id ${id} was deleted.` });
        })
        .catch(error => {
            sendUserError(500, `The post could not be removed`, res);
        });
});

server.put('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const { title, contents } = req.body;
    if(!title || !contents) {
        sendUserError(400, `Please provide title and contents for the post.`, res);
        return;
    }
    db
        .update(id, {title, contents})
        .then(response => {
            if(response === 0) {
                sendUserError(404, `The post with the specified ID does not exist.`, res);
                return;
            }
            db
                .findById(id)
                .then(post => {
                    res.json({post});
                })
                .catch(error => {
                    sendUserError(500, `The post information could not be modified.`, res);
                });

        })
        .catch(error => {
            sendUserError(500, `The post information could not be modified.`, res);
        });
});

server.listen(port, () => console.log(`Server is running on port ${port}`));

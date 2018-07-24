// import your node modules
const express = require('express');
const server = express();

const db = require('./data/db.js');

server.use(express.json());

const sendServerError = (msg, res) => {
    res.status(500);
    res.json({ Error: msg });
    return;
  };

server.get('/api/posts', (req, res) => {
    db.find()
    .then( response => {
        res.status(200).json(response);
    })
    .catch (err => {
        sendServerError({error: 'The posts information could note be retrieved.'});
    });
});

server.get('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    if(!id) {
        res.status(404);
        res.json({error: 'The post with the specified ID does not exist'});
    }
    db.findById(id)
    .then( response => {
        res.status(200).json(response);
    })
    .catch (err => {
        sendServerError('error: The post information could note be retrieved.');
    });
});
server.post('/api/posts', (req, res) => {
    const { title, contents } = req.body;
    const newPost = req.body;

    if (!title || !contents) {
        res.status(400).send({error: 'Please provide title and contents for the post.'});
    }
    db.insert(newPost)
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        sendServerError('error: There was an error while saving the post to the database.');
    });
});

server.put('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    const { title, contents } = req.body;
    const updatedPost = { title, contents }

    if(!id) {
        res.status(404);
        res.send('error: The post with the specified ID does not exist.');
    }
    if (!title || !contents) {
        res.status(400);
        res.send({error: 'Please provide title and contents for the post.'});
    }

    db.update(id, updatedPost)
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        sendServerError('error: The post information could not be modified.');
    });
});

server.delete('/api/posts/:id', (req, res) => {
    const id = req.params.id;

    if (!id) {
        res.status(404);
        res.send('error: The post with the specified ID does not exist.');
    }

    db.remove(id)
    .then(
        res.status(200).send('The post has been deleted')
    )
    .catch(err => {
        sendServerError('error: The post could not be removed.');
    });
});



server.listen(8000, () => console.log('API running'))

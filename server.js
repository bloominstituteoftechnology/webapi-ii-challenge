const express = require('express');
const cors = require('cors');
const db = require('./data/db')
const app = express();

const port = 5555;

app.use(express.json());
app.use(cors());
// add your server code starting here

const reportUserError = (status, message, res) => {
    res.status(status).json({ errorMessage: message});
    return;
};

app.get('/', (req, res) => {
    res.send('This is an Express test.');
});

app.get(`/api/posts`, (req, res) => {
    db
    .find()
    .then(posts => {
        res.json({ posts })
    })
    .catch(error => {
        reportError(500, 'We cannot find this user information.', res);
        return;
        // res.json({ error });
    })
});

app.get(`/api/post/:id`, (req, res) => {
    const { id } = req.params;
    db
    .findById(id)
    .then(posts => {
        if (posts.length === 0) {
            reportUserError(404, 'This post does not exist', res);
            return;
        }
        res.json(posts[0])
    })
    .catch(error => {
        reportUserError(500, 'Cannot find requested post', res);
    })
});

app.post('/api/posts', (req, res) => {
    const { title, contents } = req.body;
    if(!title || !contents) {
        reportUserError(400, 'You must provide title and contents', res);
        return;
    }
    db
    .insert({ title, contents })
    .then(response => {
        console.log(response);
        res.status(201).json(response);
    })
    .catch(error => {
        console.log(error);
        reportUserError(400, error, res);
        return;
    });
});

app.delete(`/api/posts/:id`, (req, res) => {
    const { id } = req.params;
    db
    .remove(id)
    .then(response => {
        if (response === 0) {
            reportUserError(404, 'This post ID number does not exist in this database.', res);
        }
        res.json(response)
    })
    .catch(error => {
        reportUserError(500, 'Cannot delete this post.', res);
        return;
    });
});

app.put(`/api/posts/:id`, (req, res) => {
    const { id } = req.params;
    const { title, contents } = req.body;
    db
    .update(id, { title, contents })
    .then(response => {
        res.json(response);
    })
    .catch(error => {
        res.json({ error });
    })
});

app.listen(port, () => console.log(`Server running on port ${port}`));
// import your node modules

const express = require('express');
const db = require('./data/db');
const cors = require('cors');

// add your server code starting here

const port = 5555;
const server = express();
server.use(express.json());
server.use(cors({ origin: 'http://localhost:3000' }));

server.post('/', (req, res) => {
    // 1st arg: route where a resource can be interacted with
    // 2nd arg: callback to deal with sending responses, and handling incoming data.
    res.send('Hello from express');
});

const customLogger = (req, res, next) => {
    const ua = req.headers['user-agent'];
    const { path } = req;
    const timeStamp = Date.now();
    const log = { ua, path, timeStamp };
    const stringLog = JSON.stringify(log);

    console.log(stringLog);

    next(); // needed to move to next routehandler.
}

server.use(customLogger);

server.post('/api/posts', (req, res) => {
    const { title, contents } = req.body;
    db
        .insert({ title, contents })
        .then(response => {
            res.json(response);
        })
        .catch(error => {
            sendUserError(500, 'There was an error while saving the post to the database', res);
            return;
        });
});


server.get('/api/posts', (req, res) => {
    db
        .find()
        .then(posts => {
            res.json({ posts });
        })
        .catch(error => {
            res.json({ error });
        });
});


server.delete('/api/posts', (req, res) => {
    const { id } = req.query;
    let user;

    db
        .findById(id)
        .then(foundPost => {
            post = { ...foundPost[0] };

            db.remove(id).then(response => {
                res.status(200).json(post);
            });
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

server.get('/api/posts/:id', (req, res) => {
   
    const id = req.params.id;

    db
        .findById(id)
        .then(post => {
            if (posts.length === 0) {
                res.status(404).json({ message: 'The post with the specified ID does not exist' });
            } else {
                res.json(posts[0]);
            }
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

server.put('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const update = req.body;

    db
        .update(id, update)
        .then(count => {
            if (count > 0) {
                db.findById(id).then(posts => {
                    res.status(200).json(posts[0]);
                });

            } else {
                res.status(404).json({ msg: 'The post with the specified ID does not exist' });
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

server.put('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const { title, contents } = req.body;
    if (!title || !contents) {
        sendUserError(400, 'Please provide title and contents for the post.', res);
        return;
    }
    db
        .update(id, { title, contents })
        .then(response => {
            if (response === 0) {
                sendUserError(404, 'The post with the specified ID does not exist.', res);
                return;
            }
            db
                .findById(id)
                .then(foundPost => {
                    post = { ...foundPost[0] };

                    db.remove(id).then(response => {
                        res.status(200).json(post);
                    });
                });
        })
        .cath(error => {
            sendUserError(500, 'The post information could not be modified', res);
            return;
        });
});




server.listen(port, () => console.log(`Server running on port ${port}`));
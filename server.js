// import your node modules
const express = require('express');
const db = require('./data/db.js');

// add your server code starting here
const port = 5000;
const server = express();
server.use(({ origin: 'http://localhost:3000'}));

const sendUserError = (status, message, res) => {
    res.status(status).json({ errorMessage: message });
    return;
};

server.get('/', (req, res) => {
    const { id } = req.params;
    console.log(id);
    res.send('Hello');
});

server.post('/api/users', (req, res) => {
    const { name, bio } = req.body
    if (!name || !bio) {
        sendUserError(400, 'Must provide name and bio', res)
        return
    }
    db
    .insert({
        name,
        bio,
    })
    .then(response => {
        res.status(201).json(response);
    })
    .catch(error => {
        console.log(error);
        sendUserError(400, error, res);
        return;
    });
});

server.get('/api/users', (req, res) => {
    db
    .find()
    .then(users => {
        res.json({ users });
    })
    .catch(error => {
        sendUserError(500, 'The users information could not be retrieved', res);
        return;
    });
});

server.get('/api/users/:id', (req, res) => {
    const { id } =req.params;
    db
    .findById(id)
    .then(user => {
        if (user.length ===0) {
            senduserError(404, 'User id not found', res);
            return;
        }
        res.json(user);
    })
    .catch(error => {
        sendUserError(500, 'Error looking up user', res);
    });
});

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    db
    .remove(id)
    .then(response => {
        if(response === 0) {
            sendUserError(404, 'Userid not found', res);
            return;
        }
        res.joson({ success: 'User with id: ${id} removed from system'});
    })
    .catch(error => {
        sendUserError(500, 'The user could not be removed', res)
;
return;    })
    });
});

server.put('/api/user/:id', (req, res) => {
    const { id } = req.params;
    const { name, bio } = req.body;
    if (!name || !bio) {
        sendUserError(400, 'Must provide name and bio', res);
        return;
    }
    db
    .update(id, { name, bio })
    .then(response => {
        if (response == 0) {
            sendUserError(
                404, 
                'User id not found',
                res
            );
        }
        db
        .findByid(id)
        .then(user => {
            if (user.length === 0 ) {
              sendUserError(404, 'User id not found', res);
              return;
            }
            res.json(user);
        })
        .catch(error => {
            sendUserError(500, 'Error looking up user', res);
            return;
                 });
             })
        .catch(error => {
            sendUserError(500, 'Error occured in teh database', res);
            return;
        });
});


server.listen(port, () => console.log(`Server running on port ${port}`));
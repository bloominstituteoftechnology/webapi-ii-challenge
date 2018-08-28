// import your node modules

const db = require('./data/db.js');

// add your server code starting here

const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req, res)=> {
    res.send('Hello');
});

server.get('/api/posts', (req, res)=> {
    db.find().then(posts=> {
        res.status(200).json(posts);
    }).catch(err=> {
        console.log('error', err);

        res.status(500).json({message: "error getting data"})
    });
});

server.get('/api/posts/:id', (req, res)=> {
    db.findById(req.params.id).then(posts => {
        res.status(200).json(posts);
    }).catch(err=> {
        console.log('error', err);

        res.status(500).json({message: "error getting data"})
    });
});

server.post('/api/posts', (req, res)=> {
    db.insert(req.body).then(posts => {
        res.status(200).json(posts);
    }).catch(err=> {
        console.log('error', err);
        res.status(500).json({message: "error posting data"})
    });
});

server.put('/api/posts/:id', (req, res)=> {
    db.update(req.params.id, req.body).then(posts => {
        res.status(200).json(posts);
    }).catch(err=> {
        console.log('error', err);
        res.status(500).json({message: "error posting data"})
    });
});

server.delete('/api/posts/:id', (req, res)=> {
    db.remove(req.params.id).then(posts => {
        res.status(200).json(posts);
    }).catch(err=> {
        console.log('error', err);
        res.status(500).json({message: "error deleting data"})
    });
})



server.listen(5000, ()=> console.log('/n== API on port 5k ==/n'));

// import your node modules
const express = require('express');
const cors = require('cors');
const db = require('./data/db.js');

// add your server code starting here
const port = 5555;
const server = express();
server.use(express.json());
// server.use(cors({origin: 'http://localhost:3000'}));  Use for react app later
server.get('/', (req, res) => {
    res.send('Hi from express');
})


server.post('/api/posts', (req,res) => {
    const {title, contents} = req.body;
    if (!title || !contents) {
        res.status(400);
        res.json({ message: "Please provide title and contents for the post."});
        return;
    }


    db
        .insert({
            title,
            contents
        })
        .then(response => {
            res.status(201);
            res.json(response);
        })
        .catch(error => {
            console.log(error);
            res.status(500);
            res.json({error: "There was an error while saving the post to the database"});
            return;
        });
    });

server.get('/api/posts', (req, res) => {
    db
    .find()
    .then(posts => {
        res.json({ posts })
    })
    .catch(error => {
        res.status(500);
        res.json({ error: "The posts information could not be retrieved"});
        return;
    });
});

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;

    db 
    .findById(id)
        .then(user => {
            if (user.length === 0) {
                res.status(404);
                res.json({message: "The post with the specified ID does not exist"});
                return;
            }
            res.status(200);
            res.json(user);
        })
        .catch(error => {
            res.status(500);
            res.json({ error: "The post information could not be retrieved"});
        })
});

//DELETE

server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;

    db
    .remove(id)
        .then(response => {
            if (response === 0) {
                res.status(404); 
                res.json({message: "The post with the specified ID does not exist."});
                return;
            }
            
            res.json({message: "post deleted"});
        })
        .catch(error => {
            res.status(500);
            res.json({error: "The post could not be removed"});
        })

    });


//PUT 


server.put('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const { title, contents} = req.body;
    if( !title || !contents ){
        res.status(400);
        res.json({ errorMessage: "Please provide title and contents"});
    }

    db
    .update(id, {title, contents})
    .then(response => {
        if(response === 0) {
            res.status(404)
            res.json({ errorMessage: "The ID does not exist"});
            
        }

        res.json(response);
    })
    
    .catch(error => {
        res.status(500);
        res.json({ errorMessage: "The post information could not be modified."});
    })

})


server.listen(port, () => console.log(`Server running on port ${port}`));
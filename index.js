// import your node modules

const express = require('express');
const db = require('./data/db.js');

// add your server code starting here
const server = express();
const parser = express.json();
const PORT = "4000"

server.use(parser);

server.get('/api/posts', (req, res)  =>  {
    db.find()
        .then((posts)   =>  {
            res
            .send(posts);
        })
        .catch(err  =>  {
            res
            .status(500)
            .json({ message: "The posts information could not be retrieved." });
        });
})

server.get('/api/posts/:id', (req, res)  =>  {
    const { id } = req.params;
    db.findById(id)
        .then((posts)   =>  {
            if(posts.length === 1)   {
                res
                .send(posts);
            }   else{
                res
                .status(404)
                .json({ message: "The post with the specified ID does not exist." })
            }

        })
        .catch(err  =>  {
            res
            .status(500)
            .json({ error: "The post information could not be retrieved." });
        });
})

server.post('/api/posts', (req, res)    =>  {
    const post = req.body;
    if(post.title === "" || post.contents === "")   {
        res
        .status(400)
        .json({ errorMessage: "Please provide title and contents for the post." })
    }
    db.insert(post)
        .then((post)  =>  {
            res
            .status(201)
            .json(post)
        })
        .catch(err  =>  {
            res
            .status(500)
            .json({ error: "There was an error while saving the post to the database" });
        })
})

server.delete('/api/posts/:id', (req, res)  =>  {
    const { id } = req.params;
    db.remove(id)
        .then((count)    =>  {
            if(count === 0) {
                res
                .status(404)
                .json({ message: "The post with the specified ID does not exist." })
            }   else {
                res
                .json({ message: "Success!"})
            }
        })
        .catch(err  =>  {
            res
            .status(500)
            .json({ error: "The post could not be removed" })
        })
});

server.put('/api/posts/:id', (req, res) =>  {
    const { id } = req.params;
    const post = req.body;
    if(post.title === "" || post.contents === "" || !post.contents || !post.title)   {
        res
        .status(400)
        .json({ errorMessage: "Please provide title and contents for the post." })
    }
    db.update(id, post)
        .then((count)    =>  {
            if(count === 0) {
                res
                .status(404)
                .json({ message: "The post with the specified ID does not exist." })
            }   else {
                db.findById(id)
                    .then(post  =>  {
                        res
                        .json(post)
                    })
            }
        })
        .catch(err  =>  {
            res
            .status(500)
            .json({ error: "The post information could not be modified." })
        })
})

server.listen(PORT, () =>  {
    console.log("server started. Kind of..");
})

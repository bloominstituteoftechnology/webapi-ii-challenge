// import your node modules
const express = require("express")
const bodyParser = require("body-parser")
const db = require('./data/db.js');

// add your server code starting here
const server = express();


//Middleware
server.use(express.json());



//Route Handlers



server.get("/", (req, res) => {
    res.send("It works, moving on")
})

server.post("/api/posts", (req, res) => {
    const newPost = req.body;

    if(newPost.title.length === 0 || newPost.contents.length === 0) {
        res.status(400).json({
            errorMessage: "Please provide title and contents for the post." })
    }
    else {
        db.insert(newPost).then(response => {
            res.status(201).json(response);
        }).catch(err => {
            res.status(500).json({
                error: "There was an error while saving the post to the database" 
            })
        })

    }
})

server.get("/api/posts", (req, res) => {
    db.find().then(posts => {
        res.json(posts);
    }).catch(err => {
        res.status(500).json({
            error: "The posts information could not be retrieved."
        })
    })
})

server.get("/api/posts/:id", (req, res) => {
    const id = req.params.id;
    db.findById(id).then(user => {
        if(user.length>0) {
            res.json(user)
        } else {
            res.status(404).json({
                message: "The post with the specified ID does not exist." 
            })
        }
    }).catch(err => {
        res.status(500).json({
            error: "The post information could not be retrieved."
        })
    })
})

// query ex:
// req.query === {search: "bar", sort: "asc"}
//http://localhost:5000/api/posts?id=1
server.delete("/api/posts/:id", (req, res) => {
    const id = req.params.id;
    // const {id} = req.query

    db.findById(id).then(user => {
        if(user.length>0) {
            db.remove(id).then(response => {
                res.status(200).json({
                    sucess: "post deleted"
                })
            })
        } else {
            res.status(404).json({
                message: "The post with the specified ID does not exist." 
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            error: "The post could not be removed"
        })
    })
})

server.put('/api/posts/:id', (req, res) => {
    const id = req.params.id
    const newPost = req.body;


    db.findById(id).then(user => {
        if(user.length>0) {
            if(newPost.title.length === 0 || newPost.contents.length === 0) {
                res.status(400).json({
                    errorMessage: "Please provide title and contents for the post."
                })
            }
            else {
                db.update(id, newPost)
                .then(response => {
                    res.status(200).json({msg: "data updated successfully"});
                }) 
            }
        } else {
            res.status(404).json({
                message: "The post with the specified ID does not exist." 
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            error: "The post information could not be modified." 
        });
    });
});



server.listen(5000, () => console.log("listening on port 5000"));